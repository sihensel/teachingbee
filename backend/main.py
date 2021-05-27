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
CORS(app)
#CORS(app, resources=r'/teachingbee/*')

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
    'age': fields.Integer(attribute='_age', description='Alter'),               # vllt als String lassen?
    'semester': fields.Integer(attribute='_semester', description='Semester'),  # vllt als String lassen?
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
        pass


# werden von manage_person und create_profile benötigt
int_mapper = InterestMapper()
interests = int_mapper.find_all()

@app.route('/person/', methods=['GET', 'POST'])
#@teachingbee.response(500, 'Internal Server Error.')
def manage_person():    # muss später über die Businesslogik abgebildet werden
    pers_mapper = PersonMapper()   # person_object
    prof_mapper = ProfileMapper()  # profile_object

    if request.method == 'GET':
        # Personendaten
        pers_obj = pers_mapper.find_by_key(3)
        data = {}
        data['id'] = pers_obj.get_id()
        data['fname'] = pers_obj.get_fname()
        data['lname'] = pers_obj.get_lname()
        data['birthdate'] = pers_obj.get_birthdate()
        data['semester'] = pers_obj.get_semester()
        data['gender'] = pers_obj.get_gender()
        data['profileID'] = pers_obj.get_profileID()

        # Profildaten
        prof_obj = prof_mapper.find_by_key(pers_obj.get_profileID())
        data['course'] = prof_obj.get_course()
        data['studytype'] = prof_obj.get_studytype()
        data['extroverted'] = prof_obj.get_extroverted()
        data['frequency'] = prof_obj.get_frequency()
        data['online'] = prof_obj.get_online()

        # Interessen
        interest = int_mapper.find_by_key(pers_obj.get_profileID())
        data['interest'] = interest

        return jsonify(data)

    if request.method == 'POST':

        pers = Person.from_dict(api.payload)
        pers_mapper.update(pers)

        data = request.get_json()

        # den Interessen-String auf den Key zurückmappen
        for i in interests:
            if i[1] == api.payload['interest']:
                data['interest'] = i[0]
                break
        prof = Profile.from_dict(data)
        prof_mapper.update(prof, pers)



        return 'Success', 200

@app.route('/create_profile', methods=['POST', 'GET'])
def create_profile():
    prof_mapper = ProfileMapper()

    if request.method == 'GET':
        return jsonify(interests)

    if request.method == 'POST':
        data = request.get_json()
        profile = Profile()
        data["id"] = 0      # Placeholder, die ID wird von der Datenbank selbst gesetzt
        profile = profile.from_dict(data)

        # die ID von dem gerade gespeicherten Profil erhalten
        lastID = prof_mapper.insert(profile)
        int_mapper.insert(data['interest'], lastID)

        return 'Success', 200


app.run(debug=True)