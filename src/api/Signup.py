import flask


app = flask.Flask(__name__)

testdict = {}

@app.route('/api', methods=['POST', 'GET'])
def api_post():
    if request.method == 'POST':
        print('post app')
        req = flask.request.json
        print(flask.request)
        return 'Hi'

app.run(debug=True)