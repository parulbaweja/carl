from jinja2 import StrictUndefined
from flask_cors import CORS

from flask import (
    Flask,
    render_template,
    redirect,
    request,
    flash,
    session,
    jsonify,
    Blueprint,
    Response
)
from uuid import uuid4
import datetime
# from flask_debugtoolbar import DebugToolbarExtension
from newsapi import NewsApiClient
import os
from model import User, AuthId, Company, Contact, Application, Status, DateChange, ProCon, connect_to_db, db

newsapi = NewsApiClient(api_key=os.environ['SECRET_KEY'])
app = Flask(__name__)
app.secret_key = "abc"
app.jinja_env.undefined = StrictUndefined
bp = Blueprint('server', __name__)


@bp.route('/check_login')
def isLoggedIn():
    """Checks to see if user is logged in."""

    if session.get('token'):
        result = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()
        user = User.query.filter(User.user_id == result.user_id).first()
        data = {
            'firstName': user.fname,
            'loggedIn': True,
        }
    else:
        data = {
            'loggedIn': False,
        }

    return jsonify(data)


@bp.route('/login', methods=['POST'])
def submit_login_form():
    """Check for unique email and password. If correct, log in."""

    email = request.json.get('email')
    password = request.json.get('password')
    result = User.query.filter((User.email == email) & (User.password == password))

    if result.count() == 0:
        data = {'error': True}
    else:
        user = result.first()
        new_auth = AuthId(user_id=user.user_id, auth_token=str(uuid4()))
        db.session.add(new_auth)
        db.session.commit()
        session['token'] = new_auth.auth_token
        data = {'user_id': user.user_id,
                'fname': user.fname,
                'error': False}

    return jsonify(data)


@bp.route('/logout')
def logout():
    """Logs out user and drops session."""

    if session.get('token'):
        auth = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()
        db.session.delete(auth)
        db.session.commit()
    del session['token']
    return jsonify({'loggedIn': False})


@bp.route('/register', methods=['POST'])
def submit_register_form():
    """Creates new user. Checks existing in case."""

    email = request.json.get('email')
    password = request.json.get('password')
    fname = request.json.get('fname')
    lname = request.json.get('lname')

    result = User.query.filter((User.email == email) & (User.password == password))

    if result.count() == 0:
        new_user = User(email=email, password=password, fname=fname, lname=lname)
        db.session.add(new_user)
        db.session.commit()
        data = {'error': False}
    else:
        data = {'error': True}

    return jsonify(data)


@bp.route('/apps_repo')
def display_user_app():
    """Display one application entry for a user."""

    auth = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()

    apps = Application.query.filter(Application.user_id == auth.user_id).all()
    data = {}
    for app in apps:
        data[app.application_id] = app.to_dict()

    return jsonify(data)


@bp.route('/vert_app/<application_id>')
def get_vert_app(application_id):
    """Retrieves information for a single application."""

    app = Application.query.filter(Application.application_id == application_id).first()
    data = app.to_dict()
    return jsonify(data)


@bp.route('/timeline/<application_id>')
def display_status_timeline(application_id):
    """Displays status timeline for a specific application."""

    dates = DateChange.query.filter(DateChange.application_id==application_id).order_by(DateChange.date_id.desc()).all()
    data = []
    for date in dates:
        temp = {}
        temp['status'] = date.status.u_name
        temp['date'] = date.date_created
        data.append(temp)

    return jsonify(data)


@bp.route('/applications')
def display_all_applications():
    """Displays user's application entries."""

    auth = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()

    apps = Application.query.filter(Application.user_id == auth.user_id).all()
    data = []
    for app in apps:
        data.append(app.to_dict())

    return jsonify(data)


@bp.route('/status')
def send_statuses():
    """Sends JSON of current elements in status table."""

    statuses = Status.query.all()
    data = []

    for i, status in enumerate(statuses):
        temp = {}
        temp[status.js_name] = status.u_name
        data.append(temp)

    return jsonify(data)


@bp.route('/news/<application_id>')
def get_news(application_id):
    """Sends API request to News API. Sends JSON response to frontend."""

    app = Application.query.filter(Application.application_id == application_id).first()
    company = str(app.company.name)
    top_headlines = newsapi.get_everything(q=company,
                                           sources='the-verge,techcrunch,hacker-news,wired,bloomberg,the-new-york-times,engadget,the-wall-street-journal,ars-technica',
                                           from_parameter='2017-01-01',
                                           sort_by='relevancy',
                                           language='en')


    return jsonify(top_headlines)


@bp.route('/application', methods=['POST'])
def submit_entry():
    """Processes user's new entry."""

    result = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()
    user = User.query.filter(User.user_id == result.user_id).first()

    company = request.json.get('company')
    position = request.json.get('position')
    contactName = request.json.get('contactName')
    contactEmail = request.json.get('contactEmail')
    status = request.json.get('status')
    offerAmount = request.json.get('offerAmount')
    notes = request.json.get('notes')
    url = request.json.get('url')
    date = request.json.get('date')

    comp = Company.query.filter(Company.name == company).first()
    if comp:
        new_comp = comp
    else:
        new_comp = Company(name=company)
        db.session.add(new_comp)

    new_contact = Contact(name=contactName, email=contactEmail)
    db.session.add(new_comp)
    db.session.add(new_contact)

    new_status = Status.query.filter(Status.status_id == status).first()

    new_app = Application(user_id=user.user_id, company_id=new_comp.company_id, contact_id=new_contact.contact_id, position=position, status_id=new_status.status_id, offer_amount=offerAmount, notes=notes, url=url)
    db.session.add(new_app)
    db.session.commit()

    new_date = DateChange(application_id=new_app.application_id, status_id=new_status.status_id, date_created=date)
    db.session.add(new_date)

    db.session.commit()

    return jsonify({'error': True})


@bp.route('/application/update/<application_id>', methods=['POST'])
def update_app(application_id):
    """Updates current application info entry."""

    # Obtain form results.
    company = request.json.get('company')
    position = request.json.get('position')
    contactName = request.json.get('contactName')
    contactEmail = request.json.get('contactEmail')
    status = request.json.get('statusId')
    offerAmount = request.json.get('offerAmount')
    notes = request.json.get('notes')
    url = request.json.get('url')
    date = request.json.get('date')

    app = Application.query.filter(Application.application_id == application_id).first()

    comp = Company.query.filter(Company.name == company).first()
    if comp:
        app.company.name = company
    else:
        new_comp = Company(name=company)
        db.session.add(new_comp)

    contact = Contact.query.filter(Contact.name == contactName).first()
    if contact:
        app.contact.name = contactName
        app.contact.email = contactEmail
    else:
        new_contact = Contact(name=contactName, email=contactEmail)
        db.session.add(new_contact)

    app.position = position
    app.offer_amount = offerAmount
    app.notes = notes
    app.url = url

    # Check to see if status has changed. If so, update to dates table.
    if app.status_id != status:
        app.status_id = status
        # long_date = datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ')
        new_date = datetime.datetime.strptime(date, "%Y-%m-%d").date()
        print new_date
        # short_date = long_date.date()
        new_date_change = DateChange(application_id=app.application_id, status_id=status, date_created=new_date)
        db.session.add(new_date_change)

    # Commit all updates.
    db.session.commit()

    return jsonify(app.to_dict())


@bp.route('/analytics/status')
def get_status_analytics():
    """Retrieves status summary statistics."""

    auth = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()
    apps = Application.query.filter(Application.user_id == auth.user_id, Application.archive == False).all()

    data = {}
    for app in apps:
        if data.get(app.status.u_name):
            data[app.status.u_name] += 1
        else:
            data[app.status.u_name] = 1

    # data = {'interested': 3, 'applied': 2}

    stats = []
    for status, total in data.iteritems():
        temp = {}
        temp['x'] = status
        temp['y'] = total
        temp['label'] = status + ': ' + str(total)
        stats.append(temp)

    return jsonify(stats)


@bp.route('/analytics/date_applied')
def get_date_applied():
    """Retrieves applications per date."""

    auth = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()
    apps = Application.query.filter(Application.user_id == auth.user_id, Application.status_id > 1, Application.archive == False).all()

    data = []

    for app in apps:
        dates = DateChange.query.filter(DateChange.application_id == app.application_id).all()

        for date in dates:
            data.append({
                'x': date.date_created,
                'y': app.company.name,
                'label': date.status.u_name,
            })

    return jsonify(data)


@bp.route('/analytics/time_stats')
def get_stat_averages():
    """Retrieves specific time statistics regarding user activity."""

    auth = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()
    apps = Application.query.filter(Application.user_id == auth.user_id, Application.archive == False).all()

    interest_to_apply = get_time_stats(apps, 1, 2)
    apply_to_interview = get_time_stats(apps, 2, 4)
    interview_to_offer = get_time_stats(apps, 4, 5)
    print type(interview_to_offer)

    data = [
        {'x': 'Interest-to-Apply', 'y': interest_to_apply, 'label': interest_to_apply},
        {'x': 'Apply-to-Interview', 'y': apply_to_interview, 'label': apply_to_interview},
        {'x': 'Interview-to-Offer', 'y': interview_to_offer, 'label': interview_to_offer},
    ]

    return jsonify(data)


def get_time_stats(apps, status1, status2):

    # Time to apply - interest to apply
    time_diffs = []
    for app in apps:
        interest_date = DateChange.query.filter(DateChange.application_id == app.application_id, DateChange.status_id == status1).first()
        apply_date = DateChange.query.filter(DateChange.application_id == app.application_id, DateChange.status_id == status2).first()
        if interest_date and apply_date:
            diff = apply_date.date_created - interest_date.date_created
            time_diffs.append(diff.days)

    if time_diffs:
        return sum(time_diffs) / float(len(time_diffs))
    else:
        return 0


@bp.route('/analytics/offer_amounts')
def get_offer_amounts():

    auth = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()
    apps = Application.query.filter(Application.user_id == auth.user_id, Application.archive == False).all()

    data = []
    for app in apps:
        if app.offer_amount:
            data.append({
                'x': app.company.name,
                'y': app.offer_amount,
                'label': app.offer_amount
            })

    return jsonify(data)


@bp.route('/archive/<application_id>', methods=['POST'])
def archive(application_id):

    app = Application.query.filter(Application.application_id == application_id).first()
    app.archive = not app.archive
    db.session.commit()

    return jsonify({'archive': app.archive})


@bp.route('/add/pro_con/<application_id>', methods=['POST'])
def add_pro(application_id):
    """Adds pro for specific application to Pro/Con Table"""

    app = Application.query.filter(Application.application_id == application_id).first()
    pro = request.json.get('pro')
    con = request.json.get('con')

    if pro:
        new_pro = ProCon(is_pro=True, notes=pro, application_id=app.application_id)
        db.session.add(new_pro)

    if con:
        new_con = ProCon(is_pro=False, notes=con, application_id=app.application_id)
        db.session.add(new_con)

    db.session.commit()

    return jsonify(app.to_dict())


@bp.route('/add/con/<application_id>', methods=['POST'])
def add_con(application_id):
    """Adds con for specific application to Pro/Con Table"""

    app = Application.query.filter(Application.application_id == application_id).first()
    con = request.json.get('con')
    new_con = ProCon(is_pro=False, text=con, application_id=app.application_id)
    db.session.add(new_con)
    db.session.commit()


app.register_blueprint(bp)
if __name__ == "__main__":
    # app = Flask(__name__)
    # app.secret_key = "abc"
    # app.jinja_env.undefined = StrictUndefined
    app.debug = True


    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    # app.debug = True
    # make sure templates, etc. are not cached in debug mode
    # app.jinja_env.auto_reload = app.debug
    CORS(app, supports_credentials=True)

    connect_to_db(app)

    # Use the DebugToolbar
    # DebugToolbarExtension(app)

    app.run(port=5001, host='0.0.0.0')
