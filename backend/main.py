from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource, fields

from server.BusinessLogic import BusinessLogic
from server.db.InterestMapper import InterestMapper
from server.bo.Person import Person
from server.db.PersonMapper import PersonMapper
from server.bo.Profile import Profile
from server.db.ProfileMapper import ProfileMapper

app = Flask(__name__)
#CORS(app)
CORS(app, resources=r'/teachingbee/*')

api = Api(app, version='0.1', title='Teachingbee', description='App um Lernpartner zu finden.')
teachingbee = api.namespace('teachingbee', description='App zum finden von Lernpartnern')

# Business Object
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='ID'),
})

# Personenobjekt
person = api.inherit('Person', bo, {
    'fname': fields.String(attribute='_fname', description='Vorname'),
    'lname': fields.String(attribute='_lname', description='Nachname'),
    'birthdate': fields.String(attribute='_birthdate', description='Geburtsdatum'),
    'semester': fields.String(attribute='_semester', description='Semester'),  # vllt als String lassen?
    'gender': fields.String(attribute='_gender', description='Geschlecht'),
    'profileID': fields.Integer(attribute='_profileID', description='ID des Profils'),
})

# Profilobjekt
profile = api.inherit('Profile', bo, {
    'course': fields.String(attribute='_course', description='Studiengang'),
    'studytype': fields.String(attribute='_studytype', description='Lerntyp'),
    'extroverted': fields.String(attribute='_extroverted', description='Extrovertiertheit'),
    'frequency': fields.String(attribute='_frequency', description='Lernhäufigkeit'),
    'online': fields.String(attribute='_online', description='Online/Offline lernen'),
    'interest': fields.Integer(attribute='_interest', description='Interessen'),
})

# POST: create
# PUT: update
# DELETE: delete

@teachingbee.route('/interests')
@teachingbee.response(500, 'Internal Server Error')
class Interests(Resource):
    def get(self):
        bl = BusinessLogic()
        interests = bl.get_all_interests()
        return interests

# eine einzelne Person auslesen
@teachingbee.route('/person/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID der Person')
class PersonOperations(Resource):
    @teachingbee.marshal_with(person)
    def get(self, id):
        ''' Person aus der DB auslesen '''
        bl = BusinessLogic()
        pers = bl.get_person(id)
        return pers

    @teachingbee.marshal_with(person)
    @teachingbee.expect(person, validate=True)
    def put(self, id):
        ''' Person updaten '''
        bl = BusinessLogic()
        pers = Person.from_dict(api.payload)
        if pers:
            bl.save_person(pers)
            return '', 200
        else:
            return '', 500

    def delete(self):
        pass


@teachingbee.route('/profile/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Profils')
class ProfileOperations(Resource):
    @teachingbee.marshal_with(profile)
    def get(self, id):
        ''' Profil aus der DB auslesen '''
        bl = BusinessLogic()
        prof = bl.get_profile(id)
        return prof

    @teachingbee.marshal_with(profile)
    @teachingbee.expect(profile, validate=True)
    def put(self, id):
        ''' Profil updaten '''
        print(api.payload)
        bl = BusinessLogic()
        prof = Profile.from_dict(api.payload)
        if prof:
            bl.save_profile(prof)
            return '', 200
        else:
            return '', 500

    def delete(self):
        pass

app.run(debug=True)