#import flask
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import logging
from server.bo.Person import Person
from server.db.PersonMapper import PersonMapper as pm
from server.bo.Group import Group
from server.db.GroupMapper import GroupMapper as gm

app = Flask(__name__)
CORS(app)

data = {}

@app.route('/api', methods=['POST', 'GET'])
def api_post():
    if request.method == 'POST':
        data = request.get_json()
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


@app.route('/create-group', methods=['POST'])
def create_group():
    data = request.get_json()
    group = Group()
    group.set_gname(data["gname"])

    PM = pm()

    for i in data["members"]:
        lname, fname = i.split(', ')[0:2]
        person = PM.find_by_name(fname, lname)[0]
        id = person.get_id()
        group.add_member(id)

    fname = data["adminfname"]
    lname = data["adminlname"]
    admin = PM.find_by_name(fname, lname)[0]
    id = admin.get_id()
    group.set_admin(id)

    GM = gm()

    GM.insert(group)

    group.set_id(GM.find_by_name(group.get_gname())[0].get_id())

    GM.insert_members(group)

    return 'Success', 200


logging.getLogger('flask_cors').level = logging.DEBUG
app.run(debug=True)