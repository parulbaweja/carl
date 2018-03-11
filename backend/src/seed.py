from server import app
from sqlalchemy import func
from model import User, AuthId, Company, Contact, Application, DateChange, Status, db, connect_to_db
from uuid import uuid4

user1 = User(email="parul@gmail.com", password="mypassword", fname="Parul", lname="Baweja")

#app 1
company1 = Company(name="Hackbright")
contact1 = Contact(name="Henry Chen", email="henry@hackbrightacademy.com")
app1 = Application(user_id=1, company_id=1, contact_id=1, status_id=2, position="Instructor", offer_amount="123456", notes="-Finished take-home assessment", url="www.hackbrightacademy.com", archive=False)
datechange1 = DateChange(application_id=1, status_id=1, date_created="01/01/18")
datechange2 = DateChange(application_id=1, status_id=2, date_created="02/02/18")

company2 = Company(name="PagerDuty")
contact2 = Contact(name="Jen", email="jen@pagerduty.com")
app2 = Application(user_id=1, company_id=2, contact_id=2, status_id=4, position="Software Engineer", notes="-Demo night was on-site", url="https://www.pagerduty.com/careers/", archive=False)
datechange3 = DateChange(application_id=2, status_id=1, date_created="01/25/18")
datechange4 = DateChange(application_id=2, status_id=2, date_created="02/02/18")
datechange5 = DateChange(application_id=2, status_id=3, date_created="02/14/18")
datechange6 = DateChange(application_id=2, status_id=4, date_created="03/10/18")

company3 = Company(name="Slack")
contact3 = Contact(name="Jane", email="jane@slack.com")
app3 = Application(user_id=1, company_id=3, contact_id=3, status_id=5, position="Software Engineer, Analytics Infrastructure", offer_amount="110000", url="https://slack.com/careers/", archive=False)
datechange7 = DateChange(application_id=3, status_id=1, date_created="01/25/18")
datechange8 = DateChange(application_id=3, status_id=2, date_created="02/07/18")
datechange9 = DateChange(application_id=3, status_id=3, date_created="02/20/18")
datechange10 = DateChange(application_id=3, status_id=4, date_created="03/10/18")
datechange11 = DateChange(application_id=3, status_id=5, date_created="03/15/18")

company4 = Company(name="Eventbrite")
contact4 = Contact(name="Jane", email="jane@eventbrite.com")
app4 = Application(user_id=1, company_id=4, status_id=5, contact_id=4, position="Software Engineer, R&D", offer_amount="105000", archive=False)
datechange12 = DateChange(application_id=4, status_id=1, date_created="01/15/18")
datechange13 = DateChange(application_id=4, status_id=2, date_created="01/17/18")
datechange14 = DateChange(application_id=4, status_id=3, date_created="02/05/18")
datechange15 = DateChange(application_id=4, status_id=4, date_created="02/15/18")
datechange16 = DateChange(application_id=4, status_id=5, date_created="02/28/18")

company5 = Company(name="Facebook")
contact5 = Contact(name="Recruiter", email="recruiter@facebook.com")
app5 = Application(user_id=1, company_id=5, contact_id=5, status_id=5, position="Software Engineer", offer_amount="145000", archive=False)
datechange17 = DateChange(application_id=5, status_id=2, date_created="02/03/18")
datechange18 = DateChange(application_id=5, status_id=4, date_created="02/26/18")
datechange19 = DateChange(application_id=5, status_id=5, date_created="03/06/18")

company6 = Company(name="Google")
contact6 = Contact(name="Recruiter", email="recruiter@google.com")
app6 = Application(user_id=1, company_id=6, contact_id=6, status_id=2, position="Software Engineer", offer_amount="150000", archive=False)
datechange20 = DateChange(application_id=6, status_id=2, date_created="03/01/18")

company7 = Company(name="LeadersUp")
contact7 = Contact(name="Crissy", email="crissy@leadersup.org")
app7 = Application(user_id=1, company_id=7, contact_id=7, status_id=6, position="Project Consultant", offer_amount="60,000", archive=True)
datechange21 = DateChange(application_id=7, status_id=2, date_created="01/01/18")
datechange22 = DateChange(application_id=7, status_id=4, date_created="01/10/18")
datechange23 = DateChange(application_id=7, status_id=5, date_created="01/12/18")
datechange24 = DateChange(application_id=7, status_id=6, date_created="01/20/18")


users = [user1]
companies = [company1, company2, company3, company4, company5, company6, company7]
contacts = [contact1, contact2, contact3, contact4, contact5, contact6, contact7]
apps = [app1, app2, app3, app4, app5, app6, app7]
datechanges = [datechange1, datechange2, datechange3, datechange4, datechange5, datechange6, datechange7, datechange8, datechange9, datechange10, datechange11, datechange12, datechange13, datechange14, datechange15, datechange16, datechange17, datechange18, datechange19, datechange20, datechange21, datechange22, datechange23, datechange24]

def load_data(ls):
    for obj in ls:
        db.session.add(obj)
        db.session.commit()


def createStatusTable():
    """Updates database with status table."""

    statuses = [('interested','Interested'), ('applied', 'Applied'), ('phoneCall', 'Phone call'), ('interview', 'Interview'), ('offer', 'Offer'), ('accepted', 'Accepted'), ('withdrawn', 'Withdrawn'), ('notAFit', 'Not a fit')]
    for status in statuses:
        temp = Status(js_name=status[0], u_name=status[1])
        db.session.add(temp)
        db.session.commit()


if __name__ == "__main__":
    connect_to_db(app)
    db.create_all()
    load_data(users)
    load_data(companies)
    load_data(contacts)
    createStatusTable()
    load_data(apps)
    load_data(datechanges)

