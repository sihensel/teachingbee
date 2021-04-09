import json

data = []
with open('MyJSON.txt', 'r') as json_file:
    mydata = json.load(json_file)
    for a in mydata:
        data.append(mydata[a]["fname"])

print(data)