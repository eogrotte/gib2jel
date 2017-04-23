from app import db, ma

#from werkzeug.security import generate_password_hash, check_password_hash

# Data model for sites
class Site(db.Model):
    __tablename__ = "sites"
    __table_args__ = {'extend_existing': True}
    name = db.Column(db.String, primary_key=True)
    category = db.Column(db.String)
    description = db.Column(db.String)
    x = db.Column(db.Float)
    y = db.Column(db.Float)

    def __init__(self, name, category, description, x, y):
        self.name = name
        self.category = category
        self.description = description
        self.x = x
        self.y = y

class SiteSchema(ma.ModelSchema):
    class Meta:
        model = Site
        #fields = ('name', 'category', 'description', 'x', 'y')

    # Data model for users
    '''
    class User(db.Model):
        __tablename__ = "users"
        __table_args__ = {'extend_existing': True}
        username = db.Column(db.String, primary_key=True)
        password = db.Column(db.String)

        def __init__(self, username, password):
            self.username = username
            self.set_password(password)

        def set_password(self, password):
            self.pw_hash = generate_password_hash(password)

        def check_password(self, password):
            return check_password_hash(self.pw_hash, password)
    '''
