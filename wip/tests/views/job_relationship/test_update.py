from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import Job, JobRelationship, Relationship


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.object = Job.objects.first()
        self.url = reverse('wip:jobrelationship-update', kwargs={'pk': self.object.pk})
        self.user = self.create_user()

    def test_login_required(self):
        response = self.client.get(self.url)
        expected_url = '{}?next={}'.format(reverse('login'), self.url)
        self.assertRedirects(response, expected_url, 302, 200)

    def test_logged_in_grants_access(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_can_update(self):
        self.client.force_login(self.user)
        relationship = Relationship.objects.first()
        data = {
            'relationships-TOTAL_FORMS': '1',
            'relationships-INITIAL_FORMS': '1',
            'relationships-MIN_NUM_FORMS': '0',
            'relationships-MAX_NUM_FORMS': '10',
            'relationships-0-id': 1,
            'relationships-0-job': self.object.pk,
            'relationships-0-user': self.user.pk,
            'relationships-0-relationship': relationship.pk
        }
        response = self.client.post(self.url, data)

        # test exists
        JobRelationship.objects.get(
            pk=1,
            job=self.object,
            user=self.user,
            relationship_id=relationship
        )

        # test redirected after
        self.assertRedirects(response, self.object.get_absolute_url(), 302, 200)
