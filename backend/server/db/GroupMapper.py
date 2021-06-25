from server.db.Mapper import Mapper
from server.bo.Group import Group


class GroupMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_key(self, key):
        ''' Gruppe anhand der ID auslesen '''
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, gname, info, profileID FROM Studygroup WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, gname, info, profileID) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_name(gname)
            group.set_info(info)
            group.set_profileID(profileID)
            result = group
        except IndexError:
            ''' wenn tuples leer ist '''
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_profileID(self, profileID):
        ''' Gruppe anhand des Profils finden '''
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, gname, info, profileID FROM Studygroup WHERE profileID={}".format(profileID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, gname, info, profileID) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_name(gname)
            group.set_info(info)
            group.set_profileID(profileID)
            result = group
        except IndexError:
            ''' wenn tuples leer ist '''
            result = None

        self._cnx.commit()
        cursor.close()

        return result
    
    def insert(self, group):
        ''' Einfügen eines Group-Objekts in die Datenbank '''
        cursor = self._cnx.cursor()

        command = "INSERT INTO Studygroup (gname, info, profileID) VALUES (%s, %s, %s)"
        data = (group.get_name(), group.get_info(), group.get_profileID())
        cursor.execute(command, data)
        self._cnx.commit()

        cursor.execute("SELECT LAST_INSERT_ID()")   # die ID des gerade geschriebenen Datensatzen auslesen
        tuples = cursor.fetchall()
        group.set_id(tuples[0][0])

        self._cnx.commit()
        cursor.close()

        return group

    def insert_member(self, groupID, personID):
        ''' eine Person einer Gruppe hinzufügen '''

        cursor = self._cnx.cursor()
        command = "INSERT INTO R_person_group (groupID, personID) VALUES (%s, %s)"
        data = (groupID, personID)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
    
    def remove_member(self, groupID, personID):
        ''' Eine Person aus einer Gruppe entfernen '''

        cursor = self._cnx.cursor()
        command = "DELETE FROM R_person_group WHERE groupID=%s AND personID=%s"
        data = (groupID, personID)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
    
    def check_group(self, groupID):
        ''' Check, ob eine Gruppe noch Mitglieder hat '''

        cursor = self._cnx.cursor()
        command = "SELECT * FROM R_person_group WHERE groupID={}".format(groupID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        self._cnx.commit()
        cursor.close()

        if len(tuples) > 0:
            return True
        else:
            return False
    
    def find_members(self, groupID):
        ''' Gibt alle Mitglieder einer Gruppe zurück '''

        cursor = self._cnx.cursor()
        command = "SELECT personID FROM R_person_group WHERE groupID={}".format(groupID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        self._cnx.commit()
        cursor.close()

        result = [i[0] for i in tuples]

        return result
    
    def find_groups_of_person(self, personID):
        ''' Gibt alle Gruppen einer Person zurück '''
        cursor = self._cnx.cursor()
        command = "SELECT groupID FROM R_person_group WHERE personID={}".format(personID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        self._cnx.commit()
        cursor.close()

        result = [i[0] for i in tuples]

        return result

    def update(self, group):
        ''' Gruppe updaten '''
        cursor = self._cnx.cursor()

        command = "UPDATE Studygroup " + "SET gname=%s, info=%s WHERE id=%s"
        data = (group.get_name(), group.get_info(), group.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return group

    def delete(self, groupID):
        ''' Gruppe löschen '''
        cursor = self._cnx.cursor()

        command = "DELETE FROM Studygroup WHERE id={}".format(groupID)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
    
    def leave_all_groups(self, personID):
        ''' Wenn der Account gelöscht wird, sollen alle Gruppen verlassen werden '''
        cursor = self._cnx.cursor()

        command = "DELETE FROM R_person_group WHERE personID={}".format(personID)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()