from app import db

# Create our database model
class Site(db.Model):
    __tablename__ = "sites"
    #id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, primary_key=True)
    category = db.Column(db.String, unique=False)
    description = db.Column(db.String, unique=False)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return 'Navn %r>' % self.name

    def __init__(self, category):
        self.category = category

    def __repr__(self):
        return 'Kateogri %r>' % self.category