from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource, fields

from server.BusinessLogic import BusinessLogic
from server.bo.Person import Person
from server.bo.Profile import Profile
from server.bo.Group import Group

from server.bo.Message import Message
from server.bo.GroupMessage import GroupMessage

app = Flask(__name__)
CORS(app, resources=r'/teachingbee/*')


api = Api(app, version='0.1', title='Teachingbee',
          description='App um Lernpartner zu finden.')
teachingbee = api.namespace(
    'teachingbee', description='App zum finden von Lernpartnern')

# Business Object
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='ID'),
})

# Personenobjekt
person = api.inherit('Person', bo, {
    'fname': fields.String(attribute='_fname', description='Vorname'),
    'lname': fields.String(attribute='_lname', description='Nachname'),
    'birthdate': fields.String(attribute='_birthdate', description='Geburtsdatum'),
    # vllt als String lassen?
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

# Gruppenobjekt
group = api.inherit('Group', bo, {
    'name': fields.String(attribute='_name', description='Gruppenname'),
    'info': fields.String(attribute='_info', description='Gruppeninfo'),
    'profileID': fields.Integer(attribute='_profileID', description='Profil ID'),
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
            bl.link_person_profile(
                api.payload['personID'], api.payload['profileID'])
            return 'successfull', 200
        else:
            return '', 500

# eine einzelne Nachricht bearbeiten


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
        bl = BusinessLogic()
        msg = Message.from_dict(api.payload)
        if msg:
            m = bl.add_message(msg)
            return m, 200
        else:
            return '', 500

# eine Liste von Chats verwalten


@teachingbee.route('/chatlist/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Users')
class ChatListOperations(Resource):

    @teachingbee.marshal_with(person)
    def get(self, id):
        ''' Nachricht aus der DB auslesen '''
        bl = BusinessLogic()
        personList = bl.get_chatList(id)
        return personList


@teachingbee.route('/grouplist/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Users')
class GroupListOperations(Resource):

    @teachingbee.marshal_with(group)
    def get(self, id):
        ''' Nachricht aus der DB auslesen '''
        bl = BusinessLogic()
        groupList = bl.get_groupList(id)
        return groupList


# eine einzelne Gruppennachricht bearbeiten
@teachingbee.route('/groupchat/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID der Gruppe')
class GroupChatOperations(Resource):
    @teachingbee.marshal_with(groupmessage)
    def get(self, id):
        ''' Nachricht aus der DB auslesen '''
        bl = BusinessLogic()
        chat = bl.get_group_message(id)
        return chat

    @teachingbee.marshal_with(groupmessage)
    @teachingbee.expect(groupmessage, validate=True)
    def post(self, id):
        bl = BusinessLogic()
        msg = GroupMessage.from_dict(api.payload)
        if msg:
            m = bl.add_group_message(msg)
            return m, 200
        else:
            return '', 500

# Person matchen


@teachingbee.route('/match-person/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID der Person')
class PersonMatching(Resource):
    @teachingbee.marshal_with(person)
    def get(self, id):
        bl = BusinessLogic()
        matchList = bl.match(id)
        return matchList[0]

# Gruppe matchen


@teachingbee.route('/match-group/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID der Person')
class GroupMatching(Resource):
    @teachingbee.marshal_with(group)
    def get(self, id):
        bl = BusinessLogic()
        matchList = bl.match(id)
        return matchList[1]


@teachingbee.route('/groups/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Teilnehmers')
class GroupsByMember(Resource):
    def get(self, id):
        ''' Gruppen aus der DB auslesen '''
        bl = BusinessLogic()
        groups = bl.get_group_by_member(id)
        return groups


@teachingbee.route('/group/<int:id>')
@teachingbee.response(500, 'Internal Server Error')
@teachingbee.param('id', 'ID des Users')
class GroupOperations(Resource):

    @teachingbee.marshal_with(group)
    def get(self, id):
        ''' Nachricht aus der DB auslesen '''
        bl = BusinessLogic()
        group = bl.get_group(id)
        return group

    @teachingbee.marshal_with(group)
    @teachingbee.expect(group, validate=True)
    def put(self, id):
        bl = BusinessLogic()
        group = Group.from_dict(api.payload)
        if group:
            g = bl.update_group(group)
            return g, 200
        else:
            return "", 500

    def delete(self, id):
        pass


@teachingbee.route('/groups')
@teachingbee.response(500, 'Internal Server Error')
class AddGroup(Resource):

    @teachingbee.marshal_with(group)
    @teachingbee.expect(group, validate=True)
    def post(self):
        bl = BusinessLogic()
        group = Group.from_dict(api.payload["group"])
        personID = api.payload["personID"]
        # group.set_gname(response)

        if group:
            g = bl.add_group(group, personID)
            return g, 200
        else:
            return '', 500


app.run(debug=True)
