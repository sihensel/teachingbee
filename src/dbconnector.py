'''
module to select data from the database

timestamps are messed up for now, needs to be fixed/looked into!
'''

import mysql.connector
from mysql.connector import errorcode
import json

USER = 'me'
PASSWD = 'password'
HOST = '192.168.0.105'
DB = 'teachingbee'

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

    query = ('SELECT * FROM interests_in_profile INNER JOIN profile ON profileID = profile.id INNER JOIN interests ON interestID = interests.id')
    cursor = cnx.cursor()
    cursor.execute(query)
    print(cursor)

    for item in cursor:
        print(item)

    cnx.close()
    print('done')