from jinja2 import StrictUndefined

from flask import (Flask, render_template, redirect, request, flash, session)
from flask_debugtoolbar import DebugToolbarExtension

from model import User, Company, Contact, Application, connect_to_db, db

app = Flask(__name__)

app.secret_key = "abc"

app.jinja_env.undefined = StrictUndefined

@app.route('/')
def index():
    """Homepage."""

    return render_template('homepage.html')


@app.route('/login')
def show_login_form():
    """Display user log-in page."""

    return render_template('login.html')


@app.route('/login', methods=['POST'])
def submit_login_form():
    """Check for unique email and password. If correct, log in."""

    email = request.form.get('email')
    password = request.form.get('password')

    result = User.query.filter((User.email == email) & (User.password == password))

    if result.count() == 0:
        flash('Username and/or password incorrect.')
        return redirect('/login')
    else:
        user = result.first()
        session['user_id'] = user.user_id
        flash('Logged in')
        return redirect('/user/' + str(user.user_id))


@app.route('/add_app')
def add_application():
    """Shows application entry form."""

    return render_template('add_app.html')


@app.route('/add_app', methods=['POST'])
def submit_application():
    """Processes application entry form."""

    user_id = User.query.filter(session['user_id'] == user_id).first()

    company_name = request.form.get('company_name')
    company = Company.query.filter(Company.name == company_name).first()
    if company:
        company_id = company.company_id
    else:
        company = Company(name=company_name)
        db.session.add(company)
        db.session.commit()
        company_id = company.company_id

    contact_name = request.form.get('contact_name')
    contact_email = request.form.get('contact_email')
    contact = Contact(name=contact_name, email=contact_email)
    db.session.add(contact)
    db.session.commit()

    status = request.form.get('status')
    status_db = Status.query.filter(Status.name == status).first()
    status_id = status_db.status_id

    offer_amount = request.form.get('offer_amount')
    notes = request.form.get('notes')
    url = request.form.get('url')



    app = Application(user_id=user_id,
                      company_id=company_id,
                      contact_id=contact.contact_id,
                      status_id=status_id,
                      offer_amount=offer_amount,
                      notes=notes,
                      url=url)




























