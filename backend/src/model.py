# createdb jobs
# db.create_all()
# psql jobs

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import EmailType

db = SQLAlchemy()

class User(db.Model):
    """User of job search website."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(64), nullable=False)
    password = db.Column(db.String(64), nullable=False)
    fname = db.Column(db.String(64), nullable=False)
    lname = db.Column(db.String(64), nullable=False)

    auth_token = db.relationship('AuthId')

    def __repr__(self):
        """Displays user object."""

        return "<User user_id={} email={}>".format(self.user_id, self.email)


class AuthId(db.Model):

    __tablename__ = "auth_ids"

    auth_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    auth_token = db.Column(db.String(36), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

class Company(db.Model):
    """Company from job search website."""

    __tablename__ = "companies"

    company_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(64), nullable=False)

    def __repr__(self):
        """Displays company object."""

        return "<User company_id={} name={}>".format(self.company_id, self.name)


class Contact(db.Model):
    """Contact from job search website."""

    __tablename__ = "contacts"

    contact_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    # application_id = db.Column(db.Integer, db.ForeignKey('applications.application_id'), nullable=False)
    name = db.Column(db.String(64), nullable=True)
    email = db.Column(db.String(64), nullable=True)

    def __repr__(self):
        """Displays contact object."""

        return "<Contact name={}>".format(self.name)


class Status(db.Model):
    """Static table for application status."""

    __tablename__ = "status"

    status_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    js_name = db.Column(db.String(50), nullable=False)
    u_name = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        """Displays status object."""

        return "<Status name={}>".format(self.name)


class DateChange(db.Model):
    """Dates from job search website."""

    __tablename__ = "dates"

    date_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    application_id = db.Column(db.Integer, db.ForeignKey('applications.application_id'), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey('status.status_id'), nullable=False)

    # This column logs the date a change was created
    date_created = db.Column(db.Date, nullable=False)

    application = db.relationship('Application', backref=db.backref('dates'), order_by=application_id)
    status = db.relationship('Status', backref=db.backref('status'), order_by=status_id)


class Application(db.Model):
    """Application from job search website."""

    __tablename__ = "applications"

    # ID columns
    application_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.company_id'), nullable=False)
    contact_id = db.Column(db.Integer, db.ForeignKey('contacts.contact_id'), nullable=True)
    status_id = db.Column(db.Integer, db.ForeignKey('status.status_id'), nullable=False)

    position = db.Column(db.String(50), nullable=True)
    offer_amount = db.Column(db.String(50), nullable=True)

    # Misc columns
    notes = db.Column(db.String(200), nullable=True)
    url = db.Column(db.String(100), nullable=True)

    # Relationships to other tables
    user = db.relationship('User', backref=db.backref('applications', order_by=application_id))
    company = db.relationship('Company', backref=db.backref('applications', order_by=application_id))
    contact = db.relationship('Contact', backref=db.backref('applications', order_by=application_id))
    status = db.relationship('Status', backref=db.backref('applications', order_by=application_id))

    def to_dict(self):
        """Turns application information into a dictionary."""

        data = {
            'appId': self.application_id,
            'company': self.company.name,
            'position': self.position,
            'contactName': self.contact.name,
            'contactEmail': self.contact.email,
            'status': self.date.status.u_name,
            'offerAmount': self.offer_amount,
            'notes': self.notes,
            'url': self.url,
            'date': self.date.date_created,
        }

        return data

    @property
    def date(self):
        return DateChange.query.filter(
            DateChange.application_id == self.application_id).order_by(DateChange.date_id.desc()).first()

    def __repr__(self):
        """Displays application object."""

        return "<User application_id={} user_id={} company_id={}>".format(self.application_id,
                                                                          self.user_id,
                                                                          self.company_id)

##############################################################################
# Helper functions

def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our PstgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///jobs'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)



if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    from server import app
    connect_to_db(app)
    print "Connected to DB."

























