from server.db.Mapper import Mapper
from server.bo.Person import Person

class PersonMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Lies alle Tupel aus und gib sie als Objekte zurück."""
        pass

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, fname, lname, birthdate, semester, gender, profileID FROM Person WHERE id={}".format(key)
        # command = "SELECT * FROM Person WHERE id={}".format(key)   # only when the timestamp is needed as well
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

    def insert(self, object):
        """Füge das folgende Objekt als Datensatz in die DB ein."""
        pass

    def update(self, person):
        ''' Einen Eintrag in der Datenbank mittels eines Objekts updaten '''
        cursor = self._cnx.cursor()

        command = "UPDATE Person " + "SET fname=%s, lname=%s, birthdate=%s, semester=%s, gender=%s WHERE id=%s"
        data = (person.get_fname(), person.get_lname(), person.get_birthdate(), person.get_semester(), person.get_gender(), person.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, object):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        pass