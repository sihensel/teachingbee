from server.db.Mapper import Mapper
from server.bo.Group import Group


class GroupMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
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
        command = "SELECT id, gname, profileID FROM Studygroup WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, gname, profileID) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_name(gname)
            group.set_profileID(profileID)
            result = group
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_profileID(self, profileID):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return User-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, gname, profileID FROM Studygroup WHERE profileID={}".format(profileID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, gname, profileID) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_name(gname)
            group.set_profileID(profileID)
            result = group
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, group):
        #Einfügen eines Group-Objekts in die Datenbank.

        cursor = self._cnx.cursor()

        command = "INSERT INTO Studygroup (gname, admin, profileID) VALUES (%s, %s, %s)"
        data = (group.get_gname(), group.get_admin(), 1)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def insert_members(self, group):
        #Einfügen eines Member-Objekts in die Datenbank.

        for i in group.get_members():
            cursor = self._cnx.cursor()
            command = "INSERT INTO r_person_group (groupID, personID) VALUES (%s, %s)"
            data = (group.get_id(), i)
            cursor.execute(command, data)

            self._cnx.commit()
            cursor.close()


    def update(self, group):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Studygroup " + "SET gname=%s, admin=%s WHERE id=%s"
        data = (group.get_gname(), group.get_admin())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, group):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Studygroup WHERE id={}".format(group.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()