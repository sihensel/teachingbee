import json
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler

app = Flask(__name__, static_url_path='', static_folder='Frontend/testreactapp/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

data = []
with open('MyJSON.txt', 'r') as json_file:
    mydata = json.load(json_file)
    for a in mydata:
        data.append(mydata[a]["fname"])

print(data)

api.add_resource(HelloApiHandler, '/flask/hello')