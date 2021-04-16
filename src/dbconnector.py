import mysql.connector
from mysql.connector import errorcode
import json

USER = 'me'
PASSWD = 'password'
HOST = '192.168.0.105'
DB = 'bankproject'

try:
    cnx = mysql.connector.connect(user=USER, password=PASSWD,
                              host=HOST,
                              database=DB)

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)

else:
    data = {}

    query = ('SELECT * FROM customers') # WHERE firstName = "Herbert"')
    cursor = cnx.cursor()
    cursor.execute(query)
    print(cursor)

    for id, fname, lname in cursor:
        data[id] = {'fname' : fname, 'lname': lname}

    cnx.close()
    print('done')

    filepath = r'C:\Users\me\Desktop\testdata.json'
    with open(filepath, 'w') as file:
        json.dump(data, file)

with open(r'C:\Users\me\Desktop\test.json', 'r') as file:
    data = json.load(file)

    for i in data:
        print(data[i]['fname'])
