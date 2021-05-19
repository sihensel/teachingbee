from server.db.Mapper import Mapper
import sys
from server.bo.Group import Group


class GroupMapper(Mapper):
    #def __init__(self):
        #super(self).__init__()

    def find_all(self):
        """Auslesen aller Benutzer unseres Systems.

        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
                des Systems repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from studygroup")
        tuples = cursor.fetchall()

        for (id, stamp, gname, admin, profileID) in tuples:
            group = Group()
            group.set_name(gname)
            group.set_admin(admin)
            result.append(group)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, gname):
        """Auslesen aller Benutzer anhand des Benutzernamens.

        :param name Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, gname, admin FROM studygroup WHERE gname LIKE '{}' ORDER BY gname".format(gname)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, gname, admin) in tuples:
            group = Group()
            group.set_id(id)
            group.set_name(gname)
            group.set_admin(admin)
            result.append(group)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return User-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, gname, admin FROM studygroup WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, gname, admin) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_name(gname)
            group.set_admin(admin)
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

        command = "INSERT INTO studygroup (gname, admin, profileID) VALUES (%s, %s, %s)"
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

        command = "UPDATE studygroup " + "SET gname=%s, admin=%s WHERE id=%s"
        data = (group.get_gname(), group.get_admin())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, group):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM studygroup WHERE id={}".format(group.get_id())
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