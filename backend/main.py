#import flask
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource, fields

from server.db.InterestMapper import InterestMapper
from server.bo.Person import Person
from server.db.PersonMapper import PersonMapper
from server.bo.Profile import Profile
from server.db.ProfileMapper import ProfileMapper

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
def manage_person():    # muss später über die Businesslogik abgebildet werden
    pers_obj = PersonMapper()   # person_object
    prof_obj = ProfileMapper()  # profile_object

    if request.method == 'GET':
        pers_obj = pers_obj.find_by_key(2)
        data = {}
        data['id'] = pers_obj.get_id()
        data['fname'] = pers_obj.get_fname()
        data['lname'] = pers_obj.get_lname()
        data['birthdate'] = pers_obj.get_birthdate()
        data['semester'] = pers_obj.get_semester()
        data['gender'] = pers_obj.get_gender()
        data['profileID'] = pers_obj.get_profileID()

        prof_obj = prof_obj.find_by_key(pers_obj.get_profileID())
        data['course'] = prof_obj.get_course()
        data['studytype'] = prof_obj.get_studytype()
        data['extroverted'] = prof_obj.get_extroverted()
        data['frequency'] = prof_obj.get_frequency()
        data['online'] = prof_obj.get_online()

        return jsonify(data)

    if request.method == 'POST':

        pers = Person.from_dict(api.payload)
        pers_obj.update(pers)

        prof = Profile.from_dict(api.payload)
        prof_obj.update(prof, pers)

        return 'Success', 200
        

@app.route('/create_profile', methods=['POST', 'GET'])
def create_profile_post():
    i_mapper = InterestMapper()
    prof_mapper = ProfileMapper()
    
    if request.method == 'GET':
        interests = i_mapper.find_all()
        return jsonify(interests)

    if request.method == 'POST':
        data = request.get_json()
        profile = Profile()
        data["id"] = 0      # Placeholder, die ID wird von der Datenbank selbst gesetzt
        profile = profile.from_dict(api.payload)

        interests = []
        for i in range(len(data['interests'])):
            interests.append(data['interests'][i]['value'])
        lastID = prof_mapper.insert(profile)
        i_mapper.insert(interests, lastID)

        return 'Success', 200


app.run(debug=True)