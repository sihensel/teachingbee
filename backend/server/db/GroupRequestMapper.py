from server.db.Mapper import Mapper

class GroupRequestMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self, groupID):
        ''' Liest alle Anfragen aus, die eine Person erhalten hat '''
        cursor = self._cnx.cursor()

        command = "SELECT DISTINCT sender, groupID FROM Grouprequest WHERE groupID={}".format(groupID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples:
            return tuples[0]
        else:
            return None
    
    def find_by_key(self, key):
        pass

    def find_group_by_person(self, personID):

        cursor = self._cnx.cursor()

        command = "SELECT DISTINCT sender, groupID FROM Grouprequest WHERE sender={}".format(personID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        return tuples

    def insert(self, sender, group):
        """Einfügen eines User-Objekts in die Datenbank. """
        cursor = self._cnx.cursor()
        command = "INSERT INTO Grouprequest (sender, groupID) VALUES (%s,%s)"
        data = (sender, group)

        cursor.execute(command, data)
        self._cnx.commit()

        self._cnx.commit()
        cursor.close()

        return 'successfull'

    def update(self, profile):
        pass

    def delete(self, sender, groupID):
        """Löschen der Daten eines User-Objekts aus der Datenbank. """

        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Grouprequest WHERE sender={} AND groupID={}".format(sender, groupID))

        self._cnx.commit()
        cursor.close()
    
    def delete_by_group(self, groupID):
        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Grouprequest WHERE groupID={}".format(groupID))

        self._cnx.commit()
        cursor.close()
    
    def delete_group_by_person(self, personID):
        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Grouprequest WHERE sender={}".format(personID))

        self._cnx.commit()
        cursor.close()