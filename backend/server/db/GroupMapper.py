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
        command = "SELECT id, gname, info, profileID FROM Studygroup WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, gname, info, profileID) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_name(gname)
            group.set_info(info)
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
        command = "SELECT id, gname, info, profileID FROM Studygroup WHERE profileID={}".format(profileID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, gname, info, profileID) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_name(gname)
            group.set_info(info)
            group.set_profileID(profileID)
            result = group
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_member(self, member):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT groupID FROM R_person_group WHERE personID={}".format(member)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for groupID in tuples:
            result.push(self.find_by_key(groupID))
            

        self._cnx.commit()
        cursor.close()

        return result
    
    

    def insert(self, group):
        #Einfügen eines Group-Objekts in die Datenbank.

        cursor = self._cnx.cursor()

        command = "INSERT INTO Studygroup (gname, info, profileID) VALUES (%s, %s, %s)"
        data = (group.get_name(), group.get_info(), group.get_profileID())
        cursor.execute(command, data)

        self._cnx.commit()


        cursor.execute("SELECT LAST_INSERT_ID()")   # die ID des gerade geschriebenen Datensatzen auslesen
        tuples = cursor.fetchall()
        group.set_id(tuples[0][0])

        self._cnx.commit()

        cursor.close()

        return group

    def insert_member(self, groupID, personID):
        #Einfügen eines Member-Objekts in die Datenbank.

    
        cursor = self._cnx.cursor()
        command = "INSERT INTO R_person_group (groupID, personID) VALUES (%s, %s)"
        data = (groupID, personID)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def update(self, group):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Studygroup " + "SET gname=%s, info=%s WHERE id=%s"
        data = (group.get_name(), group.get_info(), group.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return group

    def delete(self, group):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Studygroup WHERE id={}".format(group.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()