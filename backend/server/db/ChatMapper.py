from server.db.Mapper import Mapper
from server.bo.Message import Message

class ChatMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self, senderID):
        ''' Auslesen aller Chatpartner eines Users '''
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT DISTINCT recipient FROM Message WHERE sender = '{}'".format(senderID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for i in tuples:
            result.append(i[0])
        
        command = "SELECT DISTINCT sender FROM Message WHERE recipient = '{}'".format(senderID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for i in tuples:
            if i[0] not in result:
                result.append(i[0])

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_sender(self, sender, recipient):
        """Auslesen aller Benutzer anhand des Benutzernamens.

        :param name Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM Message WHERE sender = '{}' AND recipient = '{}' ORDER BY stamp".format(sender, recipient)
        cursor.execute(command)
        tuples = cursor.fetchall()
        
        for (id, stamp, content, sender, recipient) in tuples:
            message = Message()

            message.set_id(id)
            message.set_stamp(stamp)
            message.set_content(content)
            message.set_sender(sender)
            message.set_recipient(recipient)

            result.append(message)

        command = "SELECT * FROM Message WHERE sender = '{}' AND recipient = '{}' ORDER BY stamp".format(recipient, sender)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, stamp, content, sender, recipient) in tuples:
            message = Message()

            message.set_id(id)
            message.set_stamp(stamp)
            message.set_content(content)
            message.set_sender(sender)
            message.set_recipient(recipient)

            result.append(message)

        self._cnx.commit()
        cursor.close()

        return result
        
    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM Message WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()


        try:
            (id, stamp, content, sender, recipient) = tuples[0]
            message = Message()

            message.set_id(id)
            message.set_stamp(stamp)
            message.set_content(content)
            message.set_sender(sender)
            message.set_recipient(recipient)

            result = message

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, message):
        """Einfügen eines User-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param user das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()

        command = "INSERT INTO Message (content, sender, recipient) VALUES (%s,%s,%s)"
        data = (message.get_content(), message.get_sender(), message.get_recipient())
        cursor.execute(command, data)

        cursor.execute("SELECT LAST_INSERT_ID()")   # die ID des gerade geschriebenen Datensatzen auslesen
        tuples = cursor.fetchall()
        message.set_id(tuples[0][0])

        self._cnx.commit()
        cursor.close()

        return message

    def update(self, message):
        pass

    def delete(self, message):
        pass