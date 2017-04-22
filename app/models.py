from app import db

# Data model for sites
class Site(db.Model):
    __tablename__ = "sites"
    __table_args__ = {'extend_existing': True}
    name = db.Column(db.String, primary_key=True)
    category = db.Column(db.String)
    description = db.Column(db.String)
    x = db.Column(db.Float)
    y = db.Column(db.Float)

    def __init__(self, name, category, description):
        self.name = name
        self.category = category
        self.description = description

    def __init__(self, name, category, description, x, y):
        self.name = name
        self.category = category
        self.description = description
        self.x = x
        self.y = y

    def __repr__(self):
        return '<Site %r>' % self.name
