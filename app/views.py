from flask import render_template, request, json, abort
from app import app
from app import db
from app.models import Site, SiteSchema
import sys

site_schema = SiteSchema()
sites_schema = SiteSchema(many=True)

@app.route('/')
@app.route('/index')
def index():
    sites = get_sites()
    return render_template('index.html',
                           title = 'GIB2 Prosjekt',
						   sites = sites)

@app.route('/addSite', methods=['POST'])
def add_site():
    if not request.json or not 'name' in request.json:
        abort(400)

    site = Site(**request.json)
    siteExists = None
    try:
        dbSite = get_site(site.name)
        siteExists = True
    except:
        e = sys.exc_info()[0]
        if (e.code == 404):
            siteExists = False
        else:
            raise Exception("Uventet feil ved lagring")

    if siteExists:
        raise Exception("Stedet eksisterer allerede")

    db.session.add(site)
    db.session.commit()
    #return 'ok'
    #return json.dumps({'success': True, 'name': request.json['name']}), 200, {'ContentType': 'application/json'}
    return "ok"

@app.route('/sites', methods=['GET'])
def get_sites():
    rows = db.session.query(Site).all()
    return sites_schema.jsonify(rows)

@app.route('/sites/<name>', methods=['GET'])
def get_site(name):
    site = Site.query.filter_by(name=name).first_or_404()
    return site_schema.jsonify(site)

@app.route('/sites/delete/<name>', methods=['GET'])
def delete_site(name):
    db.session.query(Site).filter(Site.name == name).delete()
    db.session.commit()
    return name

@app.route('/shortestPath', methods=['POST'])
def find_shortest_path():
    return "ok"