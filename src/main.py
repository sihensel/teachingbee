#import flask
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

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

app.run(debug=True)