from django.db import models


class PaymentOption(models.Model):
    title = models.CharField(
        max_length=50,
        unique=True
    )

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title
