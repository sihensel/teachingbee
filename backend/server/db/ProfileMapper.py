from server.db.Mapper import Mapper
from server.bo.Profile import Profile

class ProfileMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = []

        cursor = self._cnx.cursor()

        command = "SELECT id, course, studytype, extroverted, frequency, online, interest FROM Profile WHERE id!={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()
 
        for (id, course, studytype, extroverted, frequency, online, interest) in tuples:
            profile = Profile()
            profile.set_id(id)
            profile.set_course(course)
            profile.set_studytype(studytype)
            profile.set_extroverted(extroverted)
            profile.set_frequency(frequency)
            profile.set_online(online)
            profile.set_interest(interest)
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

        command = "SELECT id, course, studytype, extroverted, frequency, online, interest FROM Profile WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()
        
        try:
            (id, course, studytype, extroverted, frequency, online, interest) = tuples[0]
            profile = Profile()
            profile.set_id(id)
            profile.set_course(course)
            profile.set_studytype(studytype)
            profile.set_extroverted(extroverted)
            profile.set_frequency(frequency)
            profile.set_online(online)
            profile.set_interest(interest)
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
        command = "INSERT INTO Profile (course, studytype, extroverted, frequency, online, interest) VALUES (%s,%s,%s,%s,%s, %s)"
        data = (profile.get_course(), profile.get_studytype(), profile.get_extroverted(), profile.get_frequency(), profile.get_online(), profile.get_interest())

        cursor.execute(command, data)
        self._cnx.commit()

        cursor.execute("SELECT LAST_INSERT_ID()")   # die ID des gerade geschriebenen Datensatzen auslesen
        tuples = cursor.fetchall()
        profile.set_id(tuples[0][0])

        self._cnx.commit()
        cursor.close()

        return profile

    def update(self, profile):
        ''' Einen Eintrag in der Datenbank mittels eines Objekts updaten '''
        cursor = self._cnx.cursor()

        command = "UPDATE Profile " + "SET course=%s, studytype=%s, extroverted=%s, frequency=%s, online=%s, interest=%s WHERE id=%s"
        data = (profile.get_course(), profile.get_studytype(), profile.get_extroverted(), profile.get_frequency(), profile.get_online(), profile.get_interest(), profile.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return profile

    def delete(self, profileID):
        """Löschen der Daten eines User-Objekts aus der Datenbank. """

        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Profile WHERE id={}".format(profileID))

        self._cnx.commit()
        cursor.close()