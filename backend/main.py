from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource, fields

from server.BusinessLogic import BusinessLogic
from server.bo.Person import Person
from server.bo.Profile import Profile
from server.bo.Group import Group


app = Flask(__name__)
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

# interessen aus der Datenbank auslesen
@teachingbee.route('/interests')
@teachingbee.response(500, 'Internal Server Error')
class Interests(Resource):
    def get(self):
        bl = BusinessLogic()
        interests = bl.get_all_interests()
        return interests

# eine einzelne Person bearbeiten
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
            p = bl.save_person(pers)
            return p, 200
        else:
            return '', 500

    def delete(self, id):
        bl = BusinessLogic()
        pers = Person.from_dict(api.payload)
        result = bl.delete_person(pers)
        return result, 200

# Person neu speichern
@teachingbee.route('/persons')
@teachingbee.response(500, 'Internal Server Error')
class AddPerson(Resource):
    @teachingbee.marshal_with(person)
    def post(self):
        bl = BusinessLogic()
        pers = Person.from_dict(api.payload)
        if pers:
            p = bl.add_person(pers)
            return p, 200
        else:
            return '', 500

# Profil bearbeiten
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
        bl = BusinessLogic()
        prof = Profile.from_dict(api.payload)
        if prof:
            p = bl.save_profile(prof)
            return p, 200
        else:
            return '', 500

# Profil neu speichern
@teachingbee.route('/profiles')
@teachingbee.response(500, 'Internal Server Error')
class AddProfile(Resource):
    @teachingbee.marshal_with(profile)
    def post(self):
        bl = BusinessLogic()
        prof = Profile.from_dict(api.payload)
        if prof:
            p = bl.add_profile(prof)
            return p, 200
        else:
            return '', 500

# Profil und Person verknüpfen
@teachingbee.route('/link')
@teachingbee.response(500, 'Internal Server Error')
class LinkPersonProfile(Resource):
    def put(self):
        if api.payload:
            bl = BusinessLogic()
            bl.link_person_profile(api.payload['personID'], api.payload['profileID'])
            return 'successfull', 200
        else:
            return '', 500



@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if request.method == 'GET':
        fname = request.args.get('fname')
        lname = request.args.get('lname')

        PM = pm()
        user = PM.find_by_name(fname, lname)[0]
        id = user.get_id()
        CM = cm()
        response = CM.find_by_sender(id)

        answer = []

        for i in response:
            answer.append({
                "content": i.get_content(),
                "sender": i.get_sender(),
                "recipient": i.get_recipient()
            })

        return jsonify(answer)
    if request.method == 'POST':
        data = request.get_json()
        msg = Message()
        CM = cm()
        PM = pm()
        sender = PM.find_by_name(data["senderf"], data["senderl"])
        recipient = PM.find_by_name(data["recipientf"], data["recipientl"])

        msg.set_content(data["content"])
        msg.set_sender(sender[0].get_id())
        msg.set_recipient(recipient[0].get_id())

        CM.insert(msg)
        

        return 'Success', 200



@teachingbee.route('/groups/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Teilnehmers')
class GroupsByMember(Resource):
    def get(self, id):
        ''' Gruppen aus der DB auslesen '''
        bl = BusinessLogic()
        groups = bl.get_group_by_member(id)
        return groups

@teachingbee.route('/groups')
@teachingbee.response(500, 'Internal Server Error')
class AddGroup(Resource):
   
    def post(self):
        bl = BusinessLogic()
        response = api.payload
        group = Group()
        #group.set_gname(response)
        print(response)


        if prof:
            p = bl.add_profile(prof)
            return p, 200
        else:
            return '', 500


app.run(debug=True)
