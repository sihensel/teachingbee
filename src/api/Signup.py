@app.route('/api/', methods=['POST', 'GET'])
def api_post():
    if request.method == 'POST':
        print('post app')
        req = request.json
        print(req)
        return jsonify(name='john')