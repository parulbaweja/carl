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
# from flask_debugtoolbar import DebugToolbarExtension

from model import User, AuthId, Company, Contact, Application, Status, DateChange, connect_to_db, db

app = Flask(__name__)
app.secret_key = "abc"
app.jinja_env.undefined = StrictUndefined

bp = Blueprint('server', __name__)

@bp.route('/check_login')
def isLoggedIn():
    """Checks to see if user is logged in."""
    print session
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
    # import ipdb; ipdb.set_trace()
    email = request.json.get('email')
    password = request.json.get('password')
    # print email, password
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

    print data

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


@bp.route('/user/app/<application_id>')
def display_user_app(application_id):
    """Display one application entry for a user."""

    if session.get('token'):
        result = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()
        user = User.query.filter(User.user_id == result.user_id).first()
        app = Application.query.filter(Application.user_id == user.user_id, Application.application_id == application_id).first()
        date = DateChange.query.filter(DateChange.application_id==app.application_id).order_by(DateChange.date_id.desc()).first()
        data = {
            'company': app.company.name,
            'position': app.position,
            'contactName': app.contact.name,
            'contactEmail': app.contact.email,
            'status': date.status_id,
            'offerAmount': app.offer_amount,
            'notes': app.notes,
            'url': app.url,
            'date': date.date_created,
        }

        return jsonify(data)


@bp.route('/timeline/<application_id>')
def display_status_timeline(application_id):
    """Displays status timeline for a specific application."""

    dates = DateChange.query.filter(DateChange.application_id==application_id).order_by(DateChange.date_id.desc()).all()
    data = {}
    for date in dates:
        data[date.date_id] = {
                                'status': date.status.js_name,
                                'date': date.date_created,
        }

    return jsonify(data)



@bp.route('/user/<user_id>')
def get_user(user_id):
    pass


@bp.route('/applications')
def display_all_applications():
    """Displays user's application entries."""

    auth = AuthId.query.filter(AuthId.auth_token == session['token']).order_by(AuthId.auth_id.desc()).first()

    apps = Application.query.filter(Application.user_id == auth.user_id).all()
    data = []
    for app in apps:
        temp = {}
        temp['userID'] = app.user_id
        temp['applicationID'] = app.application_id
        temp['company'] = app.company.name
        temp['position'] = app.position
        temp['contactName'] = app.contact.name
        temp['contactEmail'] = app.contact.email
        temp['status'] = app.status.u_name
        temp['offerAmount'] = app.offer_amount
        temp['notes'] = app.notes
        temp['url'] = app.url

        last_date = DateChange.query.filter(DateChange.application_id == app.application_id).order_by(DateChange.date_id.desc()).first()
        temp['lastDate'] = last_date.date_created
        data.append(temp)

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
    status = request.json.get('status')
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
    if app.status_id  == status:
        app.status_id = status
    else:
        new_date_change = DateChange(application_id=app.application_id, status_id=status, date_created=date)
        db.session.add(new_date_change)

    # Commit all updates.
    db.session.commit()

    return jsonify({})


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
