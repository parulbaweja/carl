from faker import Faker

fake = Faker()

fake.name()
fake.company()
fake.date(pattern="%Y-%m-%d", end_datetime=None)
fake.email()
fake.url()
fake.text()
