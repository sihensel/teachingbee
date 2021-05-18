#import flask
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from server.bo.Person import Person
from server.db.PersonMapper import PersonMapper as pm

import dbconnector

app = Flask(__name__)
CORS(app)

data = {}

@app.route('/api', methods=['POST', 'GET'])
def api_post():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        person = Person()
        person.set_birthdate(data["birthdate"])
        person.set_gender(data["gender"])
        person.set_semester(data["semester"])
        person.set_fname(data["fname"])
        person.set_lname(data["lname"])
        mapper = pm()
        mapper.insert(person)
        return 'Success', 200

    if request.method == 'GET':
        data = request.get_json()

        return 'Success', 200

app.run(debug=True)