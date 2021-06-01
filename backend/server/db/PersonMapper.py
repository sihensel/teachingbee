from server.db.Mapper import Mapper
from server.bo.Person import Person

class PersonMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_name(self, fname, lname):
<<<<<<< HEAD
        """Auslesen aller Benutzer anhand des Benutzernamens.

        :param name Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, fname, lname, birthdate, semester, gender FROM person WHERE fname LIKE '{}' AND lname LIKE '{}' ORDER BY fname".format(fname, lname)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, fname, lname, birthdate, semester, gender) in tuples:
            person = Person()
            person.set_id(id)
            person.set_birthdate(birthdate)
            person.set_gender(gender)
            person.set_semester(semester)
            person.set_fname(fname)
            person.set_lname(lname)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result
=======
        pass
>>>>>>> main

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
<<<<<<< HEAD
        command = "SELECT * FROM person WHERE id={}".format(key)
=======
        command = "SELECT id, fname, lname, birthdate, semester, gender, profileID FROM Person WHERE id={}".format(key)
        # command = "SELECT * FROM Person WHERE id={}".format(key)   # only when the timestamp is needed as well
>>>>>>> main
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
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, person):
        """Einfügen eines User-Objekts in die Datenbank. """
        cursor = self._cnx.cursor()

        command = "INSERT INTO Person (fname, lname, birthdate, semester, gender, profileID) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (person.get_fname(), person.get_lname(), person.get_birthdate(), person.get_semester(), person.get_gender(), person.get_profileID())
        cursor.execute(command, data)

        self._cnx.commit()

        cursor.execute("SELECT LAST_INSERT_ID()")
        tuples = cursor.fetchall()

        person.set_id(tuples[0][0])

        #self._cnx.commit()
        cursor.close()

        return person

    def update(self, person):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Person " + "SET fname=%s, lname=%s, birthdate=%s, semester=%s, gender=%s WHERE id=%s"
        data = (person.get_fname(), person.get_lname(), person.get_birthdate(), person.get_semester(), person.get_gender(), person.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return person

    def delete(self, personID):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
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