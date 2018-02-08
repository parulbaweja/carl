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
    Blueprint
)
# from flask_debugtoolbar import DebugToolbarExtension

from model import User, Company, Contact, Application, Status, DateChange, connect_to_db, db

app = Flask(__name__)
app.secret_key = "abc"
app.jinja_env.undefined = StrictUndefined

bp = Blueprint('server', __name__)

@bp.route('/login', methods=['POST'])
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


@bp.route('/add_app', methods=['POST'])
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


@bp.route('/user/app/<user_id>/<application_id>')
def display_user_app(user_id, application_id):
    """Display one application entry for a user."""

    app = Application.query.filter(Application.user_id == user_id, Application.application_id == application_id).first()

    data = [{
        'company': app.company.name,
        'position': app.position,
        'contactName': app.contact.name,
        'contactEmail': app.contact.email,
        'status': app.status.name,
        'offerAmount': app.offer_amount,
        'notes': app.notes,
        'url': app.url,
    }]

    return jsonify(data)


@bp.route('/user/<user_id>')
def get_user(user_id):
    pass


@bp.route('/application/<user_id>')
def display_application(user_id):
    """Displays user's application entries."""

    apps = Application.query.filter(Application.user_id == user_id).all()
    # date = DateChange.query.filter(DateChange.application_id == app.application_id).first()
    data = []
    for app in apps:
        temp = {}
        temp['company'] = app.company.name
        temp['position'] = app.position
        temp['contactName'] = app.contact.name
        temp['contactEmail'] = app.contact.email
        temp['status'] = app.status.name
        temp['offerAmount'] = app.offer_amount
        temp['notes'] = app.notes
        temp['url'] = app.url
        data.append(temp)

    return jsonify(data)


@bp.route('/application/<user_id>', methods=['POST'])
def submit_entry(user_id):
    """Processes user's new entry."""

    company = request.json.get('company')
    position = request.json.get('position')
    contactName = request.json.get('contactName')
    contactEmail = request.json.get('contactEmail')
    status = request.json.get('status')
    offerAmount = request.json.get('offerAmount')
    notes = request.json.get('notes')
    url = request.json.get('url')

    new_comp = Company(name=company)
    new_contact = Contact(name=contactName, email=contactEmail)
    db.session.add(new_comp)
    db.session.add(new_contact)

    new_status = Status.query.filter(Status.name == status).first()

    new_app = Application(user_id=user_id, company_id=new_comp.company_id, contact_id=new_contact.contact_id, position=position, status_id=new_status.status_id, offer_amount=offerAmount, notes=notes, url=url)
    db.session.add(new_app)
    db.session.commit()

    return jsonify({})


if __name__ == "__main__":
    # app = Flask(__name__)
    # app.secret_key = "abc"
    # app.jinja_env.undefined = StrictUndefined
    app.debug = True

    app.register_blueprint(bp)

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
