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
        cursor = self._cnx.cursor()
        cursor.execute("SELECT interest FROM Profile WHERE id={}".format(key))
        tuples = cursor.fetchall()
        int_id = tuples[0][0]

        cursor.execute("SELECT iname FROM Interests WHERE id={}".format(int_id))
        tuples = cursor.fetchall()
        iname = tuples[0][0]
        return iname

    def insert(self, interest, profileID):
        pass 
 
    def update(self, interestID, profileID):
        pass

    def delete(self, id):
        pass