from server.db.Mapper import Mapper

class InterestMapper(Mapper):
    """Mapper-Klasse, die Customer-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Interessen.

        :return die Interessen
        """
        interestList = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from Interests")
        tuples = cursor.fetchall()

        for (id, iname) in tuples:
            interests = []
            interests.append(id)
            interests.append(iname)
            interestList.append(interests)

        self._cnx.commit()
        cursor.close()

        return interestList
   
    def find_by_key(self, key):
        ''' Datensatz mit der jeweiligen profileID aus R_interests_profile auslesen
        return die Liste mit den selektierte Interessen '''
        interestList = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT interestID FROM R_interests_profile WHERE profileID={}".format(key))
        tuples = cursor.fetchall()

        for i in tuples:
            interestList.append(i[0])
        return interestList

    def insert(self, interests, profileID):
        ''' Die Interessen in die Relationstabelle R_interests_profile eintragen '''
        cursor = self._cnx.cursor()
        command = "INSERT INTO R_interests_profile (profileID, interestID) VALUES (%s, %s)"
        for i in range(len(interests)):
            data = (profileID, interests[i])
            cursor.execute(command, data)
            self._cnx.commit()
        cursor.close()
        
        return True
 
    def update(self, old_interestList, new_interestList, profile):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        # quick and dirty-Lösung, sollte noch besser implementiert werden!
        if old_interestList == new_interestList:
            pass
        else:
            self.delete(profile.get_id())
            self.insert(new_interestList, profile.get_id())

    def delete(self, id):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        cursor = self._cnx.cursor()
        command = "DELETE FROM R_interests_profile WHERE profileID={}".format(id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()