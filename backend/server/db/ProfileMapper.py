from server.bo.Profile import Profile
from server.db.Mapper import Mapper
import sys
sys.path.append(".:/server/bo/Profile")


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
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.
        :param key Primärschlüsselattribut (->DB)
        :return User-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM users WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:

            (id, course, studytype, extroverted, frequency, online) = tuples[0]
            profile = Profile()
            profile.set_id(id)
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

    def insert(self, profile):
        """Einfügen eines User-Objekts in die Datenbank.
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.
        :param user das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profile ")
        tuples = cursor.fetchall()


        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                profile.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                profile.set_id(1)

        command = "INSERT INTO profile (course, studytype, extroverted, frequency, online) VALUES (%s,%s,%s,%s,%s)"

        package = (profile.get_course(), profile.get_studytype(), profile.get_extroverted(), profile.get_frequency(), profile.get_online())

        cursor.execute(command, package)

        self._cnx.commit()
        cursor.close()

        return profile

    def update(self, profile):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.
        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE profile " + \
            "SET course=%s, studytype=%s, extroverted=%s, frequency=%s, online=%s WHERE id=%s"
        data = (profile.get_course(), profile.get_studytype(), profile.get_extroverted(), profile.get_frequency(), profile.get_online(), profile.get_id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, profile):
        """Löschen der Daten eines User-Objekts aus der Datenbank.
        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM profile WHERE id={}".format(profile.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
