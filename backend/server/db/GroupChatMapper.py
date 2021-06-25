from server.db.Mapper import Mapper
from server.bo.GroupMessage import GroupMessage

class GroupChatMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self, personID):
        ''' Auslesen aller Chatpartner eines Users '''
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT DISTINCT groupID FROM R_person_group WHERE personID = '{}'".format(personID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for i in tuples:
            result.append(i[0])
        
        self._cnx.commit()
        cursor.close()
        return result

    def find_by_sender(self, groupID):
        ''' Nachricht eines Senders auslesen '''
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM Groupmessage WHERE groupID = '{}'".format(groupID)
        cursor.execute(command)
        tuples = cursor.fetchall()
        
        for (id, stamp, content, sender, group) in tuples:
            message = GroupMessage()
            message.set_id(id)
            message.set_stamp(stamp)
            message.set_content(content)
            message.set_sender(sender)
            message.set_group(group)
            result.append(message)

        self._cnx.commit()
        cursor.close()

        return result
        
    def find_by_key(self, key):
        pass

    def insert(self, message):
        ''' Nachricht in die DB einfügen '''
        cursor = self._cnx.cursor()

        command = "INSERT INTO Groupmessage (content, sender, groupID) VALUES (%s,%s,%s)"
        data = (message.get_content(), message.get_sender(), message.get_group())
        cursor.execute(command, data)

        cursor.execute("SELECT LAST_INSERT_ID()")   # die ID des gerade geschriebenen Datensatzen auslesen
        tuples = cursor.fetchall()
        message.set_id(tuples[0][0])

        self._cnx.commit()
        cursor.close()

        return message

    def update(self, message):
        pass

    def delete(self, groupID):
        ''' Gruppennachricht aus der DB löschen '''
        cursor = self._cnx.cursor()

        command = "DELETE FROM Groupmessage WHERE groupID={}".format(groupID)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()