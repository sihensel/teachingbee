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

    def find_by_key(self, key):
        pass

    def find_by_person(self, personID):
        ''' liest alle Anfragen aus, die einer Person geschickt oder erhalten hat '''
        cursor = self._cnx.cursor()

        command = "SELECT DISTINCT sender, recipient FROM Request WHERE sender={} OR recipient={}".format(personID, personID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        # aus den tuples müssen noch die Duplikate entfernt werden
        # (1, 2) und (2, 1) => (2, 1) entfernen
        for i in tuples:
            j = list(i)     # i in eine Liste umwandeln
            j.reverse()     # diese Liste umdrehen
            j = tuple(j)    # und wieder in ein Tupel umwandeln
            if j in tuples:
                tuples.remove(j)

        return tuples

    def insert(self, sender, recipient):
        """Einfügen eines User-Objekts in die Datenbank. """
        cursor = self._cnx.cursor()
        command = "INSERT INTO Request (sender, recipient) VALUES (%s,%s)"
        data = (sender, recipient)

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

    def delete_by_person(self, personID):
        cursor = self._cnx.cursor()

        cursor.execute("DELETE FROM Request WHERE sender={} OR recipient={}".format(personID, personID))

        self._cnx.commit()
        cursor.close()