from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import models, transaction
from django.db.models.manager import BaseManager
from django.db.models.signals import post_delete, post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone

from wip.signals import post_bulk_update, pre_bulk_update
from wip.utils import duration_to_decimal_hrs


class TimeEntryQueryset(models.QuerySet):
    def update(self, **kwargs):
        pre_bulk_update.send(sender=self.model, queryset=self, update_kwargs=kwargs, using=self.db)
        updated_pks = list(self.values_list('pk', flat=True))
        res = super().update(**kwargs)
        post_bulk_update.send(sender=self.model, updated_pks=updated_pks, update_kwargs=kwargs, using=self.db)
        return res


class TimeEntryManager(BaseManager.from_queryset(TimeEntryQueryset)):
    """ Custom manager from queryset """

    pass


class TimeEntry(models.Model):
    task = models.ForeignKey(
        'wip.Task',
        on_delete=models.PROTECT,
        related_name='time_entries'
    )
    started_at = models.DateTimeField(
        db_index=True
    )
    ended_at = models.DateTimeField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='time_entries'
    )
    comments = models.TextField(
        null=True,
        blank=True
    )
    signed_off = models.BooleanField(
        default=False
    )
    signed_off_date = models.DateTimeField(
        null=True,
        blank=True,
        editable=False
    )

    objects = TimeEntryManager()

    class Meta:
        permissions = (
            ('manage_time_entry', 'Can manage other peoples time entries'),
        )
        ordering = ['started_at']
        verbose_name_plural = 'time entries'

    def clean(self):
        super().clean()
        if self.ended_at <= self.started_at:
            raise ValidationError('End date cannot be before Start date')

    def save(self, **kwargs):
        # clean model
        self.clean()
        # update the signed off date
        if self.signed_off:
            self.signed_off_date = self.signed_off_date or timezone.now()
        else:
            self.signed_off_date = None
        # call save
        return super().save(**kwargs)

    @property
    def duration(self):
        """ returns the duration of the time """

        return self.ended_at - self.started_at


@receiver(pre_save, sender=TimeEntry)
def model_pre_save(sender, instance, **kwargs):
    try:
        instance._pre_save_task_id = TimeEntry.objects.get(id=instance.id).task_id
    except ObjectDoesNotExist:
        instance._pre_save_task_id = None


@receiver(post_save, sender=TimeEntry)
@receiver(post_delete, sender=TimeEntry)
def update_time_spent_hours(instance, **kwargs):
    def do():
        """
        We need to ensure we update the timings for task this time entry
        used to belong to incase it changes.
        """
        from wip.models import TaskTiming

        # check ids to avoid running twice for the same task
        if getattr(instance, "_pre_save_task_id", None) == instance.task_id:
            task_ids = [instance.task_id]
        else:
            task_ids = [getattr(instance, "_pre_save_task_id", None), instance.task_id]

        for tid in task_ids:
            if not tid:
                continue

            try:
                timing = TaskTiming.objects.with_calculated().get(task_id=tid)
                time_spent = duration_to_decimal_hrs(timing.qs_time_spent_hours)
                if timing.time_spent_hours != time_spent:
                    timing.time_spent_hours = time_spent
                    timing.save()
            except ObjectDoesNotExist:
                pass

    transaction.on_commit(do)
