from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    #return "Hello, World!"
    sites = []
    sites.append({'category': 'sight', 'name': 'Nidarosdomen', 'coordinates': [63.4269, 10.3969]})
    sites.append({'category': 'sight', 'name': 'Kristiansten Festning', 'coordinates':  [63.426935, 10.411155]})
    sites.append({'category': 'sight', 'name': 'Ringve Museum', 'coordinates': [63.447369, 10.454401]})
    sites.append({'category': 'sight', 'name': 'Sverresborg Museum', 'coordinates': [63.42052501, 10.35733889]})

    return render_template('index.html',
                           title = 'GIB2 Prosjekt',
						   sites = sites)

@app.route('/addSite', methods=['POST'])
def addSite():
    return "ok"