# Carl

## Summary
Carl is a web application for tracking important events during the job search. The app allows users to log entries, compare companies and view personal analytics (i.e. applications per week, application status, offer amounts).

## Technologies
* Backend: Python, Flask, SQLAlchemy, PostgreSQL
* Frontend: React.js, React-Router, Material UI, Recharts, Victory
* APIs: NewsAPI

Carl is an app built with a Python-Flask backend, supported by a PostgreSQL database and SQLAlchemy as the ORM. The React.js frontend uses the ES6 fetch promise API to make requests to the backend. The app uses React-Router to source components based on specific frontend routes. In terms of design, the app uses Material UI for various components and Recharts and Victory for the Analytics feature.

## Features
View the screencast here: [Carl](https://www.youtube.com/watch?v=Zv7Q4K4w-L0)

**Create new entries for important job-search-related events.**

![alt text](https://github.com/parulbaweja/carl/blob/master/images/Dashboard.jpg)

**View and edit entries, review activity and find recent news articles about a specific company.**

![alt text](https://github.com/parulbaweja/carl/blob/master/images/News.jpg)

**Compare companies, applications, and offers. Log pros and cons per selected company.**

![alt text](https://github.com/parulbaweja/carl/blob/master/images/Compare.jpg)

**View personal analytics based on time-series data for each logged application.**

![alt text](https://github.com/parulbaweja/carl/blob/master/images/Analytics.jpg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. Node.js
2. Python2

### Frontend

1. `npm install package.json`
2. `npm run build-dev`
3. `virtualenv venv`
4. `source venv/bin/activate`
5. `pip install -r requirements.txt`
6. `python src/server.py (runs on localhost:5000)`

### Backend

1. `virtualenv venv`
2. `source venv/bin/activate`
3. `pip install -r requirements.txt`
4. `source src/secrets/sh`
4. `python src/server.py (runs on localhost:5001)`

Get your own secret keys for [NewsAPI](https://newsapi.org/account). Save them to a file secrets.sh. Your file should look something like this:
`export SECRET_KEY='YOUR_SECRET_KEY'`

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
