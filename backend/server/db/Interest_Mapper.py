from Mapper import Mapper
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
        interests = {}
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from Interest")
        tuples = cursor.fetchall()

        for (id, iname) in tuples:
            interests[id]=iname

           
        self._cnx.commit()
        cursor.close()

        return interests
    


   
    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        pass

 
    def insert(self, object):
        """Füge das folgende Objekt als Datensatz in die DB ein."""
        pass

 
    def update(self, object):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        pass

    
    def delete(self, object):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        pass




"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with InterestMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)



