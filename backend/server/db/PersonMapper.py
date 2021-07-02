from server.db.Mapper import Mapper
from server.bo.Person import Person

class PersonMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_key(self, key):
        ''' Person anhand der ID auslesen '''
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, fname, lname, birthdate, semester, gender, profileID FROM Person WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, fname, lname, birthdate, semester, gender, profileID) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_fname(fname)
            person.set_lname(lname)
            person.set_birthdate(birthdate)
            person.set_semester(semester)
            person.set_gender(gender)
            person.set_profileID(profileID)
            result = person
        except IndexError:
            ''' wenn tuples leer ist '''
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_firebaseID(self, id):
        ''' Person anhand der FirebaseID auslesen '''
        result = []

        cursor = self._cnx.cursor()
        command = "SELECT personID FROM R_person_firebase WHERE firebaseID='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        self._cnx.commit()
        cursor.close()

        try:
            result = tuples[0][0]
        except IndexError:
            result = None
        
        return result

    def insert_firebase(self, personID, firebaseID):
        ''' Firebase ID schreiben '''
        cursor = self._cnx.cursor()

        command = "INSERT INTO R_person_firebase (personID, firebaseID) VALUES (%s,%s)"
        data = (personID, firebaseID)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
    
    def delete_firebase(self, personID):
        ''' FirebaseID löschen '''
        cursor = self._cnx.cursor()

        command = 'DELETE FROM R_person_firebase WHERE personID={}'.format(personID)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


    def find_by_profileID(self, profileID):
        ''' person anhand des Profils auslesen '''
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, fname, lname, birthdate, semester, gender, profileID FROM Person WHERE profileID={}".format(profileID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, fname, lname, birthdate, semester, gender, profileID) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_fname(fname)
            person.set_lname(lname)
            person.set_birthdate(birthdate)
            person.set_semester(semester)
            person.set_gender(gender)
            person.set_profileID(profileID)
            result = person
        except IndexError:
            ''' wenn tuples leer ist '''
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, person):
        ''' Person in die DB schreiben '''
        cursor = self._cnx.cursor()

        command = "INSERT INTO Person (fname, lname, birthdate, semester, gender, profileID) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (person.get_fname(), person.get_lname(), person.get_birthdate(), person.get_semester(), person.get_gender(), person.get_profileID())
        cursor.execute(command, data)

        self._cnx.commit()
 
        cursor.execute("SELECT LAST_INSERT_ID()")   # ID des gerade geschriebene Datensatzen auslesen
        tuples = cursor.fetchall()

        person.set_id(tuples[0][0])

        self._cnx.commit()
        cursor.close()

        return person

    def update(self, person):
        ''' Person updaten '''
        cursor = self._cnx.cursor()

        command = "UPDATE Person " + "SET fname=%s, lname=%s, birthdate=%s, semester=%s, gender=%s WHERE id=%s"
        data = (person.get_fname(), person.get_lname(), person.get_birthdate(), person.get_semester(), person.get_gender(), person.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return person

    def delete(self, personID):
        ''' Person löschen '''
        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Person WHERE id={}".format(personID))

        self._cnx.commit()
        cursor.close()
    
    def link_person_profile(self, personID, profileID):
        ''' Verknüpft ein Profilobjekt mit einem Personenobjekt '''
        cursor = self._cnx.cursor()

        command = "UPDATE Person " + "SET profileID=%s WHERE id=%s"
        data = (profileID, personID)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return 'successfull'