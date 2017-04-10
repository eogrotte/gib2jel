from app import db

#db.Model.metadata.reflect(db.engine)

# Create our database model
class Site(db.Model):
    __tablename__ = "sites"
    __table_args__ = {'extend_existing': True}
    name = db.Column(db.String, primary_key=True)
    category = db.Column(db.String)
    description = db.Column(db.String)

    def __init__(self, name, category, description):
        self.name = name
        self.category = category
        self.description = description
