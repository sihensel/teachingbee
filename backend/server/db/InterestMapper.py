from server.db.Mapper import Mapper
from flask import jsonify

##Habe noch Probleme das die Mysql datenbank einen error gibt 2005 Unknown MySQL server host obwohl alle Daten stimmen
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
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        pass

 
    def insert(self, interests, lastID):
        ''' Die Interessen in die Relationstabelle R_interests_profile eintragen '''
        cursor = self._cnx.cursor()
        command = "INSERT INTO R_interests_profile (profileID, interestID) VALUES (%s, %s)"
        for i in range(len(interests)):
            data = (lastID, interests[i])
            cursor.execute(command, data)
            self._cnx.commit()
        cursor.close()
        
        return True

 
    def update(self, object):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        pass

    
    def delete(self, object):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        pass



