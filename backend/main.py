#import flask
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin


from server.db.InterestMapper import InterestMapper as IM
from server.db.ProfileMapper import ProfileMapper

import dbconnector


app = Flask(__name__)
CORS(app)

data = {}

@app.route('/api', methods=['POST', 'GET'])
def api_post():
    if request.method == 'POST':
        data = request.get_json()
        print(data)

        dbconnector.insert(data)
        
        return 'Success', 200

    if request.method == 'GET':
        data = request.get_json()

        return 'Success', 200
        

@app.route('/create_profile', methods=['GET'])
def create_profile_post():
    if request.method == 'GET':
        interest = IM()
        interest_list = interest.find_all()

        return jsonify(interest_list)
        

app.run(debug=True)