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

    def find_by_person(self, personID):
        ''' Alle Anfragen, die eine Person geschickt hat '''
        cursor = self._cnx.cursor()

        command = "SELECT DISTINCT sender, groupID FROM Grouprequest WHERE sender={}".format(personID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        return tuples

    def insert(self, sender, group):
        ''' Anfrage in die Datenbank einfügen '''
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
        ''' Anfrage aus der DB löschen '''
        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Grouprequest WHERE sender={} AND groupID={}".format(sender, groupID))

        self._cnx.commit()
        cursor.close()
    
    def delete_by_group(self, groupID):
        ''' Anfragen an eine Gruppe löschen, wenn die Gruppe gelöscht wird '''
        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Grouprequest WHERE groupID={}".format(groupID))

        self._cnx.commit()
        cursor.close()
    
    def delete_group_by_person(self, personID):
        ''' Gruppenanfragen von einer Person löschen '''
        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Grouprequest WHERE sender={}".format(personID))

        self._cnx.commit()
        cursor.close()