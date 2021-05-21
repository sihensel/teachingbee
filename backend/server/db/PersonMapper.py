from server.db.Mapper import Mapper
from server.bo.Person import Person

class PersonMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Benutzer unseres Systems.

        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
                des Systems repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from person")
        tuples = cursor.fetchall()

        for (id, stamp, fname, lname, birthdate, semester, gender, profileID) in tuples:
            person = Person()
            person.set_birthdate(birthdate)
            person.set_gender(gender)
            person.set_semester(semester)
            person.set_fname(fname)
            person.set_lname(lname)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, fname, lname):
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

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, fname, lname, birthdate, semester, gender, profileID FROM Person WHERE id={}".format(key)
        # command = "SELECT * FROM Person WHERE id={}".format(key)   # only when the timestamp is needed as well

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
        """Einfügen eines User-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param user das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM person ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                person.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                person.set_id(1)

        print(person)

        command = "INSERT INTO person (id, stamp, fname, lname, birthdate, semester, gender, profileID) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (person.get_id(), person.get_timestamp(), person.get_fname(), person.get_lname(), person.get_birthdate(), person.get_semester(), person.get_gender(), 5)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return person

    def update(self, person):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE person " + "SET fname=%s, lname=%s, birthdate=%s, semester=%s, gender=%s WHERE id=%s"
        data = (person.get_fname(), person.get_lname(), person.get_birthdate(), person.get_semester(), person.get_gender(), person.get_id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, person):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM person WHERE id={}".format(person.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
#if (__name__ == "__main__"):
    #with PersonMapper() as mapper:
        #result = mapper.find_all()
        #for user in result:
            #print(user)
