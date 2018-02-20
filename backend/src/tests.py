from flask import json
from unittest import TestCase
import unittest
from server import app
from model import connect_to_db, db


class FlaskTests(TestCase):

    def setUp(self):
        """Stuff to do before every test."""

        connect_to_db(app)
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'abc'
        self.client = app.test_client()

        # with self.client as c:
        #     with c.session_transaction() as sess:
        #         sess['user_id'] = 1

    def test_login(self):
        result = self.client.post('/login',
                                  data={'email': 'parul@gmail.com',
                                        'password': 'mypassword'})
        # self.assertEqual(result.status_code, 200)
        import pdb; pdb.set_trace()
        # self.assertEqual(result.content_type, 'application/json')
        # data = json.loads(result.get_data())
        # self.assertEqual(data['fname'], 'Parul')


if __name__ == "__main__":
    unittest.main()
