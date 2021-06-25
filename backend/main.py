from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource, fields

from server.BusinessLogic import BusinessLogic
from server.bo.Person import Person
from server.bo.Profile import Profile
from server.bo.Group import Group

from server.bo.Message import Message
from server.bo.GroupMessage import GroupMessage

app = Flask(__name__)
CORS(app, resources=r'/teachingbee/*')

api = Api(app, version='1.0', title='Teachingbee', description='App um Lernpartner zu finden.')
teachingbee = api.namespace('teachingbee', description='Namespace der App')

# Business Object
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='ID'),
})

# Personenobjekt
person = api.inherit('Person', bo, {
    'fname': fields.String(attribute='_fname', description='Vorname'),
    'lname': fields.String(attribute='_lname', description='Nachname'),
    'birthdate': fields.String(attribute='_birthdate', description='Geburtsdatum'),
    'semester': fields.String(attribute='_semester', description='Semester'),
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

# Gruppenobjekt
group = api.inherit('Group', bo, {
    'name': fields.String(attribute='_name', description='Gruppenname'),
    'info': fields.String(attribute='_info', description='Gruppeninfo'),
    'profileID': fields.Integer(attribute='_profileID', description='Profil ID'),
})

# Nachrichtenobjekt
message = api.inherit('Message', bo, {
    'content': fields.String(attribute='_content', description='Inhalt'),
    'sender': fields.Integer(attribute='_sender', description='Sender'),
    'recipient': fields.Integer(attribute='_recipient', description='Empfänger'),
})

# Gruppennachrichten
groupmessage = api.inherit('GroupMessage', bo, {
    'content': fields.String(attribute='_content', description='Inhalt'),
    'sender': fields.Integer(attribute='_sender', description='Sender'),
    'group': fields.Integer(attribute='_group', description='ID der Gruppe'),
})

# POST: create
# PUT: update
# DELETE: delete

@teachingbee.route('/interests')
@teachingbee.response(500, 'Internal Server Error')
class Interests(Resource):
    def get(self):
        ''' Interessen aus der Datenbank auslesen '''
        bl = BusinessLogic()
        interests = bl.get_all_interests()
        return interests

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
        ''' Person löschen '''
        bl = BusinessLogic()
        pers = Person.from_dict(api.payload)
        result = bl.delete_person(pers)
        return result, 200

@teachingbee.route('/persons')
@teachingbee.response(500, 'Internal Server Error')
class AddPerson(Resource):
    @teachingbee.marshal_with(person)
    def post(self):
        ''' Person neu anlegen '''
        bl = BusinessLogic()
        pers = Person.from_dict(api.payload)
        if pers:
            p = bl.add_person(pers)
            return p, 200
        else:
            return '', 500

@teachingbee.route('/firebase/<id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'Firebase-ID der Person')
class FirebasePerson(Resource):
    @teachingbee.marshal_with(person)
    def get(self, id):
        ''' Person anhand der Firebase ID auslesen '''
        bl = BusinessLogic()
        return bl.get_person_firebase(id)
    
    def post(self, id):
        ''' Person das erste mal anlegen '''
        bl = BusinessLogic()
        print(api.payload)
        bl.add_person_firebase(api.payload['personID'], api.payload['firebaseID'])
        return '', 200

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

@teachingbee.route('/profiles')
@teachingbee.response(500, 'Internal Server Error')
class AddProfile(Resource):
    @teachingbee.marshal_with(profile)
    def post(self):
        ''' Profil neu anlegen '''
        bl = BusinessLogic()
        prof = Profile.from_dict(api.payload)
        if prof:
            p = bl.add_profile(prof)
            return p, 200
        else:
            return '', 500

@teachingbee.route('/link')
@teachingbee.response(500, 'Internal Server Error')
class LinkPersonProfile(Resource):
    def put(self):
        ''' Profil mit einer Person verknüpfen '''
        if api.payload:
            bl = BusinessLogic()
            response = bl.link_person_profile(api.payload['personID'], api.payload['profileID'])
            return response, 200
        else:
            return '', 500

@teachingbee.route('/chat/<int:sender>/<int:recipient>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('sender', 'Sender')
@teachingbee.param('recipient', 'Empfänger')
class ChatOperations(Resource):
    @teachingbee.marshal_with(message)
    def get(self, sender, recipient):
        ''' Nachricht aus der DB auslesen '''
        bl = BusinessLogic()
        chat = bl.get_message(sender, recipient)
        return chat

    @teachingbee.marshal_with(message)
    @teachingbee.expect(message, validate=True)
    def post(self, sender, recipient):
        ''' Nachricht neu anlegen '''
        bl = BusinessLogic()
        msg = Message.from_dict(api.payload)
        if msg:
            m = bl.add_message(msg)
            return m, 200
        else:
            return '', 500

@teachingbee.route('/chatlist/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Users')
class ChatListOperations(Resource):
    @teachingbee.marshal_with(person)
    def get(self, id):
        ''' Liste mit Chatpartner auslesen '''
        bl = BusinessLogic()
        personList = bl.get_chatList(id)
        return personList

@teachingbee.route('/grouplist/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Users')
class GroupListOperations(Resource):
    @teachingbee.marshal_with(group)
    def get(self, id):
        ''' Liste mit Gruppen einer Person auslesen '''
        bl = BusinessLogic()
        groupList = bl.get_groupList(id)
        return groupList
    
    def put(self, id):
        ''' Eine Gruppe verlassen '''
        bl = BusinessLogic()
        group = Group.from_dict(api.payload['group'])
        person = Person.from_dict(api.payload['person'])
        if group and person:
            bl.leave_group(group, person)
            return '', 200
        else:
            return '', 500

@teachingbee.route('/groupchat/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID der Gruppe')
class GroupChatOperations(Resource):
    @teachingbee.marshal_with(groupmessage)
    def get(self, id):
        ''' Gruppennachricht aus der DB auslesen '''
        bl = BusinessLogic()
        chat = bl.get_group_message(id)
        return chat

    @teachingbee.marshal_with(groupmessage)
    @teachingbee.expect(groupmessage, validate=True)
    def post(self, id):
        ''' Gruppennachricht neu anlegen '''
        bl = BusinessLogic()
        msg = GroupMessage.from_dict(api.payload)
        if msg:
            m = bl.add_group_message(msg)
            return m, 200
        else:
            return '', 500

@teachingbee.route('/match-person/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID der Person')
class MatchPerson(Resource):
    @teachingbee.marshal_with(person)
    def get(self, id):
        ''' Personen für das Matching vorschlagen '''
        bl = BusinessLogic()
        matchList = bl.match(id)
        return matchList[0]

# Gruppe matchen
@teachingbee.route('/match-group/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID der Person')
class MatchGroup(Resource):
    @teachingbee.marshal_with(group)
    def get(self, id):
        ''' Gruppen für das Matching vorschlagen '''
        bl = BusinessLogic()
        matchList = bl.match(id)
        return matchList[1]

@teachingbee.route('/group/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Users')
class GroupOperations(Resource):
    @teachingbee.marshal_with(group)
    def get(self, id):
        ''' Gruppe aus der DB auslesen '''
        bl = BusinessLogic()
        group = bl.get_group(id)
        return group

    @teachingbee.marshal_with(group)
    @teachingbee.expect(group, validate=True)
    def put(self, id):
        ''' Gruppe updaten '''
        bl = BusinessLogic()
        group = Group.from_dict(api.payload)
        if group:
            g = bl.update_group(group)
            return g, 200
        else:
            return '', 500

@teachingbee.route('/groups')
@teachingbee.response(500, 'Internal Server Error')
class AddGroup(Resource):
    @teachingbee.marshal_with(group)
    @teachingbee.expect(group, validate=True)
    def post(self):
        ''' Gruppe neu anlegen '''
        bl = BusinessLogic()
        group = Group.from_dict(api.payload["group"])
        personID = api.payload["personID"]

        if group:
            g = bl.add_group(group, personID)
            return g, 200
        else:
            return '', 500

@teachingbee.route('/requests/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Users')
class RequestOperations(Resource):
    @teachingbee.marshal_with(person)
    def get(self, id):
        ''' Anfragen an Personen auslesen '''
        bl = BusinessLogic()
        return bl.get_requests(id)
    
    def post(self, id):
        ''' Anfragen an eine Person anlegen '''
        bl = BusinessLogic()
        response = bl.add_request(api.payload['sender'], api.payload['recipient'])
        return response, 200
    
    def delete(self, id):
        ''' Anfragen an eine Person löschen '''
        bl = BusinessLogic()
        if api.payload['cmd'] == 'accept':
            bl.accept_request(api.payload['sender'], api.payload['recipient'])
        elif api.payload['cmd'] == 'deny':
            bl.deny_request(api.payload['sender'],  api.payload['recipient'])

@teachingbee.route('/grouprequests/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Users')
class GroupRequestOperations(Resource):
    def get(self, id):
        ''' Anfragen an Gruppen auslesen '''
        bl = BusinessLogic()
        return bl.get_group_requests(id)
    
    def post(self, id):
        ''' Anfragen an eine Gruppe anlegen '''
        bl = BusinessLogic()
        response = bl.add_group_request(api.payload['sender'], api.payload['group'])
        return response, 200

    def delete(self, id):
        ''' Anfragen an eine Gruppe löschen '''
        bl = BusinessLogic()
        if api.payload['cmd'] == 'accept':
            bl.accept_group_request(api.payload['sender'], api.payload['group'])
        elif api.payload['cmd'] == 'deny':
            bl.deny_group_request(api.payload['sender'],  api.payload['group'])

if __name__ == '__main__':
    app.run(debug=True)