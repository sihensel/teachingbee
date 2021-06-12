from server.db.Mapper import Mapper

class RequestMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self, personID):
        ''' Liest alle Anfragen aus, die eine Person erhalten hat '''
        cursor = self._cnx.cursor()

        command = "SELECT DISTINCT sender FROM Request WHERE recipient={}".format(personID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = [i[0] for i in tuples]

        return result

    def find_all_groups(self, groupID):
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
        ''' liest alle Anfragen aus, die einer Person geschickt oder erhalten hat '''
        cursor = self._cnx.cursor()

        command = "SELECT DISTINCT sender, recipient FROM Request WHERE sender={} OR recipient={}".format(personID, personID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        return tuples
    
    def find_group_by_person(self, personID):

        cursor = self._cnx.cursor()

        command = "SELECT DISTINCT sender, groupID FROM Grouprequest WHERE sender={}".format(personID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        return tuples

    def insert(self):
        pass

    def insert_request(self, sender, recipient):
        """Einfügen eines User-Objekts in die Datenbank. """
        cursor = self._cnx.cursor()
        command = "INSERT INTO Request (sender, recipient, is_group) VALUES (%s,%s,%s)"
        data = (sender, recipient, 0)

        cursor.execute(command, data)
        self._cnx.commit()

        self._cnx.commit()
        cursor.close()

        return 'successfull'

    def insert_group_request(self, sender, recipient):
        """Einfügen eines User-Objekts in die Datenbank. """
        cursor = self._cnx.cursor()
        command = "INSERT INTO Request (sender, recipient, is_group) VALUES (%s,%s,%s)"
        data = (sender, recipient, 1)

        cursor.execute(command, data)
        self._cnx.commit()

        self._cnx.commit()
        cursor.close()

        return 'successfull'

    def update(self, profile):
        pass

    def delete(self, sender, recipient):
        """Löschen der Daten eines User-Objekts aus der Datenbank. """

        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Request WHERE sender={} AND recipient={}".format(sender, recipient))

        self._cnx.commit()
        cursor.close()

    def delete_group_request(self, sender, groupID):
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
    
    def delete_by_person(self, personID):
        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Request WHERE sender={} OR recipient={}".format(personID, personID))

        self._cnx.commit()
        cursor.close()

    def delete_group_by_person(self, personID):
        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Grouprequest WHERE sender={}".format(personID))

        self._cnx.commit()
        cursor.close()