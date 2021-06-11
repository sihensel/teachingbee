from server.db.Mapper import Mapper

class RequestMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self, key):
        ''' Liest alle Anfragen aus, die eine Person erhalten hat '''
        result = []
        cursor = self._cnx.cursor()

        command = "SELECT DISTINCT sender FROM Request WHERE recipient={} AND is_group=0".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        personList = []
        for i in tuples:
            result.append(i[0])

        return result

    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = []
        cursor = self._cnx.cursor()

        command = "SELECT DISTINCT sender FROM Request WHERE recipient={} AND is_group=1".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        personList = []
        for i in tuples:
            personList.append(i[0])

        return personList

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
