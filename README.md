# Carl
A personal assistant to manage your job search.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Frontend

1. `npm install package.json`
2. `npm run build-dev`
3. `virtualenv venv`
4. `source venv/bin/activate`
5. `pip install -r requirements.txt`
6. `python server.py (runs on localhost:5000)`

### Backend

1. `virtualenv venv`
2. `source venv/bin/activate`
3. `pip install -r requirements.txt`
4. `python server.py (runs on localhost:5001)`

### Prerequisites

1. Node.js
2. Python2

## Screenshots

### Dashboard

![alt text](https://raw.githubusercontent.com/parulbaweja/jobs/master/images/Dashboard.jpg)

### Analytics

![alt text](https://raw.githubusercontent.com/parulbaweja/jobs/master/images/Analytics.jpg)

## Running the tests

Backend tests involve a setup, which connects to the database, includes a sample user and password with a session token. The following parts of the app are tested:
1. Registration.
2. Authentication.
3. Displaying a single application.
3. Form submission.

To run tests:
1. `python tests.py`

## Built With

* [React.js] (https://reactjs.org/) - Used for frontend framework
* [Material-UI] (http://www.material-ui.com/#/) - Used for frontend UI components
* [Victory] (http://formidable.com/open-source/victory/) - Used for charts
* [Flask] (http://flask.pocoo.org/docs/0.12/) - Used for backend and frontend servers
* [PosgreSQL] (https://www.postgresql.org/) - Used for database management
