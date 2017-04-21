#import os
#basedir = os.path.abspath(os.path.dirname(__file__))

#SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_DATABASE_URI = "postgresql://utvikler:Gib2Pg17@109.237.25.116/gisdb"
#SQLALCHEMY_DATABASE_URI = "postgresql://postgres:admin@localhost/gib2db"
#SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
SQLALCHEMY_TRACK_MODIFICATIONS = True