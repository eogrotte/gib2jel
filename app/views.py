from flask import render_template, request, json, abort
from app import app
from app import db
from app.models import Site

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
    if not request.json or not 'name' in request.json:
        abort(400)
    site = request.json

    siteDb = Site(site['name'], site['category'], site['description'])
    db.session.add(siteDb)
    db.session.commit()
    #return 'ok'
    return json.dumps({'success': True, 'name': site['name']}), 200, {'ContentType': 'application/json'}

@app.route('/shortestPath', methods=['POST'])
def findShortestPath():
    return "ok"