#import flask
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource, fields

#import dbconnector
from server.bo.Person import Person
from server.db.PersonMapper import PersonMapper


app = Flask(__name__)
CORS(app)

api = Api(app, version='0.1', title='Teachingbee', description='test')
teachingbee = api.namespace('teachingbee', description='App zum finden von Lernpartnern')
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='ID'),
})
person = api.inherit('Person', bo, {
    'fname': fields.String(attribute='_fname'),
    'lname': fields.String(attribute='_lname'),
    'birthdate': fields.String(attribute='_birthdate'),
    'semester': fields.String(attribute='_semester'),
    'gender': fields.String(attribute='_gender'),
})

@app.route('/person/', methods=['GET', 'POST'])
#@teachingbee.response(500, 'Internal Server Error.')
def send_person():
    if request.method == 'GET':
        obj = PersonMapper()
        obj = obj.find_by_key(1)
        data = {}
        data['id'] = obj.get_id()
        data['fname'] = obj.get_fname()
        data['lname'] = obj.get_lname()
        data['birthdate'] = obj.get_birthdate()
        data['semester'] = obj.get_semester()
        data['gender'] = obj.get_gender()

        return jsonify(data)

'''
@app.route('/api', methods=['POST', 'GET'])
def api_post():
    if request.method == 'POST':
        data = request.get_json()
        print(data)

        #dbconnector.insert(data)
        
        return 'Success', 200

    if request.method == 'GET':
        data = {'greeting':'Hello from Flask!'}
        return jsonify(data)  # serialize and use JSON headers
'''

app.run(debug=True)