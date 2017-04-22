from flask import render_template, request, json, abort
from app import app
from app import db
from app.models import Site

@app.route('/')
@app.route('/index')
def index():
    sites = []
    sites.append({'category': 'sight', 'name': 'Nidarosdomen', 'coordinates': [63.4269, 10.3969]})
    sites.append({'category': 'sight', 'name': 'Kristiansten Festning', 'coordinates':  [63.426935, 10.411155]})
    sites.append({'category': 'sight', 'name': 'Ringve Museum', 'coordinates': [63.447369, 10.454401]})
    sites.append({'category': 'sight', 'name': 'Sverresborg Museum', 'coordinates': [63.42052501, 10.35733889]})

    return render_template('index.html',
                           title = 'GIB2 Prosjekt',
						   sites = sites)

@app.route('/addSite', methods=['POST'])
def add_site():
    if not request.json or not 'name' in request.json:
        abort(400)
    siteAsJson = request.json

    site = Site(siteAsJson['name'],
                siteAsJson['category'],
                siteAsJson['description'],
                siteAsJson['x'],
                siteAsJson['y'])
    db.session.add(site)
    db.session.commit()
    #return 'ok'
    return json.dumps({'success': True, 'name': siteAsJson['name']}), 200, {'ContentType': 'application/json'}

@app.route('/sites', methods=['GET'])
def get_sites():
    query = db.session.query(Site.name, Site.category, Site.description, Site.x, Site.y).order_by(Site.name).all()
    # query = Site.query.all()
    return json.dumps([ row._asdict() for row in query ])

@app.route('/sites/delete/<name>', methods=['GET'])
def delete_sites(name):
    db.session.query(Site).filter(Site.name == name).delete()
    db.session.commit()
    return name

@app.route('/shortestPath', methods=['POST'])
def find_shortest_path():
    return "ok"