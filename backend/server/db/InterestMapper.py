from server.db.Mapper import Mapper

class InterestMapper(Mapper):
    ''' Mapper, der die Interssen aus der Tabelle 'Interests ausliest' '''

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Interessen.

        :return die Interessen mit IDs als geschachtelte Liste
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
        pass

    def insert(self, interest, profileID):
        pass 
 
    def update(self, interestID, profileID):
        pass

    def delete(self, id):
        pass