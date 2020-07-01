import time
import json
import os
from flask import Flask
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_folder='../build', static_url_path='/')


if __name__ == '__main__':
    app.run(debug=False)


@app.route('/')
def index():
    return app.send_static_file('index.html')