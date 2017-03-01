from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    #return "Hello, World!"
    #Even tester push&commit med legge inn en kommentar, som har ingen innvirkning p noe som helst annen enn ryddighet.
    user = {'nickname': 'Miguel'}  # fake user
    return render_template('index.html',
                           title='Home',
                           user=user)