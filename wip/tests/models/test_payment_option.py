from django.db import models

from wip.models import PaymentOption
from tests.test_case import AppTestCase


class ModelTests(AppTestCase):

    # fields

    def test_title(self):
        field = PaymentOption._meta.get_field('title')
        self.assertModelField(field, models.CharField)
        self.assertEqual(field.max_length, 50)
        self.assertTrue(field.unique)

    # meta

    def test_ordering(self):
        self.assertEqual(PaymentOption._meta.ordering, ['title'])

    # properties

    def test_str(self):
        self.assertEqual(str(PaymentOption(title='Foo')), 'Foo')
