from server.db.Mapper import Mapper
from server.bo.Profile import Profile

class ProfileMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Benutzer unseres Systems.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
                des Systems repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from profile")
        tuples = cursor.fetchall()

        for (id, stamp, course, studytype, extroverted, frequency, online) in tuples:
            profile = Profile()
            profile.set_id(id)
            profile.set_stamp(stamp)
            profile.set_course(course)
            profile.set_studytype(studytype)
            profile.set_extroverted(extroverted)
            profile.set_frequency(frequency)
            profile.set_online(online)
            result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, fname, lname):
        pass

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()

        command = "SELECT course, studytype, extroverted, frequency, online FROM Profile WHERE id={}".format(key)
        #command = "SELECT * FROM Profile WHERE id={}".format(key)   # only when the timestamp is needed as well
        cursor.execute(command)
        tuples = cursor.fetchall()
        
        try:
            (course, studytype, extroverted, frequency, online) = tuples[0]
            profile = Profile()
            profile.set_course(course)
            profile.set_studytype(studytype)
            profile.set_extroverted(extroverted)
            profile.set_frequency(frequency)
            profile.set_online(online)
            result = profile
        except IndexError:
            """ wenn der SELECT nichts zurück gibt """
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, profile):
        """Einfügen eines User-Objekts in die Datenbank. """
        cursor = self._cnx.cursor()
        command = "INSERT INTO Profile (course, studytype, extroverted, frequency, online) VALUES (%s,%s,%s,%s,%s)"
        data = (profile.get_course(), profile.get_studytype(), profile.get_extroverted(), profile.get_frequency(), profile.get_online())

        cursor.execute(command, data)
        self._cnx.commit()

        # die ID von dem gerade geschriebenen Datensatz erhalten, um die Interessen speichern zu können
        cursor.execute("SELECT LAST_INSERT_ID()")
        tuples = cursor.fetchall()
        try:
            (lastID) = tuples[0][0]
            result = lastID
        except IndexError:
            """ wenn der SELECT nichts zurück gibt """
            result = None

        self._cnx.commit()
        cursor.close()

        return result

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