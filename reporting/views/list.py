from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class List(LoginRequiredMixin, TemplateView):
    template_name = 'reporting/list.html'
