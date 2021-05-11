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
        cursor.execute("SELECT * from Interests")
        tuples = cursor.fetchall()

        for (id, iname) in tuples:
            interests[id]=iname

           
        self._cnx.commit()
        cursor.close()

        return interests
    


   
    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        pass

 
    def insert(self, person):
        """Einfügen eines User-Objekts in die Datenbank.
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.
        :param user das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM interests ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                interests.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                interests.set_id(1)

        command = "INSERT INTO person (id, stamp, fname, lname, birthdate, semester, gender, profileID) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (person.get_id(), person.get_timestamp(), person.get_fname(), person.get_lname(), person.get_birthdate(), person.get_semester(), person.get_gender(), NULL)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return person

 
    def update(self, object):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        pass

    
    def delete(self, object):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        pass



x = InterestMapper()
print(x.find_all())



