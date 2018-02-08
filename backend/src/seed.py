from server import app
from sqlalchemy import func
from model import User, Company, Contact, Application, DateChange, Status, db, connect_to_db

user1 = User(email="parul@gmail.com", password="mypassword", fname="Parul", lname="Baweja")
company1 = Company(name="Hackbright")
contact1 = Contact(name="Dori Grant", email="dori@hackbrightacademy.com")
app1 = Application(user_id=1, company_id=1, contact_id=1, status_id=1, position="Educator", offer_amount="123456", notes="I hope I get this job!", url="www.hackbright.com")
datechange1 = DateChange(application_id=1, status_id=1, date_created="01/01/18")

company2 = Company(name="Nerdwallet")
contact2 = Contact(name="Akshay", email="akshay@gmail.com")
app2 = Application(user_id=1, company_id=2, contact_id=2, status_id=2, position="DevOps", notes="Met at networking event.", url="www.nerdwallet.com/jobs")
datechange2 = DateChange(application_id=2, status_id=2, date_created="01/15/18")

user2 = User(email="tiffany@gmail.com", password="helloitsme", fname="Tiffany", lname="Haddish")
company3 = Company(name="Twitter")
contact3 = Contact(name="Some Guy", email="someguy@gmail.com")
app3 = Application(user_id=2, company_id=3, contact_id=3, status_id=3, position="Software Engineer", notes="Will hear back in two weeks")
datechange3 = DateChange(application_id=3, status_id=3, date_created="02/01/18")

users = [user1, user2]
companies = [company1, company2, company3]
contacts = [contact1, contact2, contact3]
apps = [app1, app2, app3]
datechanges = [datechange1, datechange2, datechange3]


def load_data(ls):
    for obj in ls:
        db.session.add(obj)

    db.session.commit()


def createStatusTable():
    """Updates database with status table."""
    statuses = ['Interested', 'Applied', 'Phone call', 'Interview', 'Offer', 'Accepted', 'Withdrawn', 'Not a fit']
    for status in statuses:
        temp = Status(name=status)
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
