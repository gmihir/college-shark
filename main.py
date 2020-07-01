import time
import json
import os
from flask import Flask
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_folder='./build', template_folder = "./static", static_url_path='/')
CORS(app)

if __name__ == '__main__':
    app.run(debug=False)

@app.route('/feature')
@app.route('/dashboard')
@app.route('/profile')
@app.route('/login')
@app.route('/signup')
@app.route('/')
def index():
    return app.send_static_file('index.html')