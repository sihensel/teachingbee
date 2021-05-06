'''
module to select data from the database

timestamps are messed up for now, needs to be fixed/looked into!
'''

import mysql.connector
from mysql.connector import errorcode
import json

# only for testing purposes
usr = 'jacky'

if usr == 'jacky':
    USER = ''
    PASSWD = ''
    HOST = 'localhost'
    DB = 'teachingbee'

elif usr == 'simon':
    USER = 'me'
    PASSWD = 'password'
    HOST = '192.168.0.105'
    DB = 'teachingbee'


'''
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

    query = ('SELECT * FROM Person WHERE id = 1')
    cursor = cnx.cursor()
    cursor.execute(query)
    print(cursor)

    for item in cursor:
        print(item)

    cnx.close()
    print('done')
'''

def insert(fetch_data):
    cnx = mysql.connector.connect(user=USER, password=PASSWD,
                              host=HOST,
                              database=DB)
    cursor = cnx.cursor()

    command = "INSERT INTO Person (fname, lname, birthdate, semester, gender) VALUES (%s,%s,%s,%s, %s)"
    data = fetch_data['fname'], fetch_data['lname'], fetch_data['birthdate'], fetch_data['semester'], fetch_data['gender']
    cursor.execute(command, data)
    cnx.commit()
    cnx.close()
    print(cursor)