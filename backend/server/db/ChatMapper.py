from server.db.Mapper import Mapper
from server.bo.Message import Message

class ChatMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self, senderID):
        ''' Auslesen aller Chatpartner eines Users '''
        result = []
        cursor = self._cnx.cursor()
        # Nachrichten, die vom User gesendet wurden
        command = "SELECT DISTINCT recipient FROM Message WHERE sender = '{}'".format(senderID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for i in tuples:
            result.append(i[0])
        
        # Nachrichten, die der User empfangen hat
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
        ''' Gibt eine Liste von Nachrichten zwischen 2 Personen zurück '''
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
        pass

    def find_by_person(self, personID):
        ''' Nachrichten einer Person auslesen '''
        cursor = self._cnx.cursor()
        command = "SELECT DISTINCT sender, recipient FROM Message WHERE sender={} OR recipient={}".format(personID, personID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        # aus den tuples müssen noch die umgekehrten Duplikate entfernt werden
        for i in tuples:
            j = list(i)     # i in eine Liste umwandeln
            j.reverse()     # diese Liste umdrehen
            j = tuple(j)    # und wieder in ein Tupel umwandeln
            if j in tuples:
                tuples.remove(j)

        return tuples

    def insert(self, message):
        ''' Nachricht in die DB schreiben '''

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