*********************
Task Management (WIP)
*********************

.. image:: https://circleci.com/gh/AccentDesign/task_management.svg?style=svg&circle-token=c9f7d668fa755388041c88f87b2a92aab935d3f8
    :target: https://circleci.com/gh/AccentDesign/task_management


Description
***********

Bare bones starter project complete with the following

- Email authentication
- Login, password reset, password change
- Karma CSS

Getting Started
***************

1, Clone the repo::

    git clone https://github.com/AccentDesign/task_management.git


2, Docker & Python

Build the container::

    docker-compose build

Up the container, this will also run migrations for you::

    docker-compose up

Create yourself a superuser::

    docker-compose exec app bash
    python manage.py createsuperuser --email=admin@example.com --first_name=Admin --last_name=User


Run python migrations manually::

    docker-compose exec app sh
    python manage.py migrate


Or load the test data including the above user (password=password)::

    python manage.py loaddata wip/tests/fixtures/test.yaml

Ready!!
*******

The container is ready at http://<docker host ip>:8000/ and a mail server ready at http://<docker host ip>:1080/


Testing
*******

To see the test results and coverage report run::

   docker-compose exec app bash
   make test

The html coverage report is visible in the browser by looking at the htmlcov/index.html once the tests have run.


Styles
******

npm install::

   npm install

build css::

   npm run watch-css
