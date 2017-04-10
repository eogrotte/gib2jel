from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.debug = True
app.config.from_pyfile('config.py')
#app.config.from_object('config')

# Creates db
db = SQLAlchemy(app)
from app import views, models