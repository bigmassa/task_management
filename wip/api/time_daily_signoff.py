from django_filters import DateFilter, ModelChoiceFilter, FilterSet
from rest_framework import viewsets

from authentication.models import User
from wip.models import TimeDailySignoff
from wip.serializers import TimeDailySignoffSerializer


class TimeDailySignoffFilter(FilterSet):
    date = DateFilter()
    user = ModelChoiceFilter(queryset=User.objects.all())


class TimeDailySignoffViewSet(viewsets.ModelViewSet):
    queryset = TimeDailySignoff.objects.all()
    serializer_class = TimeDailySignoffSerializer
    filter_class = TimeDailySignoffFilter