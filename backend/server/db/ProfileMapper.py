from server.db.Mapper import Mapper
from server.bo.Profile import Profile

class ProfileMapper(Mapper):
    def __init__(self):
        super().__init__()
    
    def find_all(self):
        """Lies alle Tupel aus und gib sie als Objekte zurück."""
        pass

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()

        command = "SELECT course, studytype, extroverted, frequency, online FROM Profile WHERE id={}".format(key)    # don't forget ProfileID!!
        #command = "SELECT * FROM Profile WHERE id={}".format(key)   # only when the timestamp is needed as well
        cursor.execute(command)
        tuples = cursor.fetchall()
        
        try:
            (course, studytype, extroverted, frequency, online) = tuples[0] # include ProfileID!!
            profile = Profile()
            profile.set_course(course)
            profile.set_studytype(studytype)
            profile.set_extroverted(extroverted)
            profile.set_frequency(frequency)
            profile.set_online(online)
            result = profile
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

    def update(self, profile, person):
        ''' Einen Eintrag in der Datenbank mittels eines Objekts updaten '''
        cursor = self._cnx.cursor()

        command = "UPDATE Profile " + "SET course=%s, studytype=%s, extroverted=%s, frequency=%s, online=%s WHERE id=%s"
        data = (profile.get_course(), profile.get_studytype(), profile.get_extroverted(), profile.get_frequency(), profile.get_online(), person.get_profileID())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, object):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        pass