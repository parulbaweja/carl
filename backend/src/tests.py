from flask import (json, session)
from unittest import TestCase
import unittest
from server import app
from model import connect_to_db, db, User


class FlaskTests(TestCase):

    def setUp(self):
        """Stuff to do before every test."""

        connect_to_db(app)
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'abc'
        app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = False
        self.client = app.test_client()

        data = {'email': 'parul@gmail.com',
                'password': 'mypassword'}
        d = json.dumps(data)
        with self.client as c:
            result = c.post('/login', data=d, content_type='application/json')
            self.session_token = session['token']


    def test_single_app(self):

        with self.client as c:
            with c.session_transaction() as sess:
                sess['token'] = self.session_token
            result = c.get('/user/app/1')
            d = json.loads(result.data)
            self.assertEqual(d['company'], 'Hackbright')
            self.assertEqual(result.status_code, 200)
            self.assertEqual(result.content_type, 'application/json')

    def test_form_submission(self):

        data = {
            'company': 'This',
            'position': 'SWE',
            'contactName': 'Her',
            'contactEmail': 'her@gmail.com',
            'status': '3',
            'offerAmount': '100000',
            'notes': 'Work',
            'url': 'www.jobs.com',
            'date': '01/30/2018'
        }

        d = json.dumps(data)
        result = self.client.post('/application', data=d, content_type='application/json')
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.content_type, 'application/json')
        j = json.loads(result.data)
        self.assertEqual(j['error'], True)


    def test_authenticate(self):

        with self.client as c:
            with c.session_transaction() as sess:
                sess['token'] = self.session_token
            result = c.get('/check_login')
            d = json.loads(result.data)
            self.assertEqual(result.status_code, 200)
            self.assertEqual(d['loggedIn'], True)
            self.assertEqual(result.content_type, 'application/json')


    def test_register(self):

        data = {
            'email': 'onetest@test.com',
            'password': 'onetest',
            'fname': 'onetest',
            'lname': 'onetest'
        }

        import ipdb; ipdb.set_trace()
        d = json.dumps(data)
        result = self.client.post('/register', data=d, content_type='application/json')
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.content_type, 'application/json')

        j = json.loads(result.data)
        self.assertEqual(j['error'], False)

        test_user = User.query.filter((User.email == data['email']) & (User.password == data['password']))
        db.session.delete(test_user)
        db.session.commit()

    # def test_update_entry(self):

    #     data = {
    #         'company': 'This',
    #         'position': 'SWE',
    #         'contactName': 'Her',
    #         'contactEmail': 'her@gmail.com',
    #         'status': '3',
    #         'offerAmount': '100000',
    #         'notes': 'Work',
    #         'url': 'www.jobs.com',
    #         'date': '01/30/2018'
    #     }



if __name__ == "__main__":
    unittest.main()
