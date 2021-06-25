from .bo.Person import Person
from .bo.Profile import Profile
from .bo.Message import Message
from .bo.GroupMessage import GroupMessage
from .bo.Group import Group

from .db.PersonMapper import PersonMapper
from .db.ProfileMapper import ProfileMapper
from .db.InterestMapper import InterestMapper
from .db.ChatMapper import ChatMapper
from .db.GroupChatMapper import GroupChatMapper
from .db.GroupMapper import GroupMapper
from .db.RequestMapper import RequestMapper
from .db.GroupRequestMapper import GroupRequestMapper


class BusinessLogic:
    def __init__(self):
        pass

    ''' Methoden für die Interessen '''
    def get_all_interests(self):
        with InterestMapper() as mapper:
            return mapper.find_all()
    
    ''' Methoden für alle Personenobjekte '''
    def get_person(self, id):
        with PersonMapper() as mapper:
            return mapper.find_by_key(id)

    def get_person_firebase(self, id):
        with PersonMapper() as mapper:
            personID = mapper.find_by_firebaseID(id)
        
        if personID is not None:
            return self.get_person(personID)
        else:
            return None
        
    def add_person_firebase(self, personID, firebaseID):
        with PersonMapper() as mapper:
            mapper.insert_firebase(personID, firebaseID)
    
    def save_person(self, person):
        with PersonMapper() as mapper:
            return mapper.update(person)
    
    def add_person(self, person):
        with PersonMapper() as mapper:
            return mapper.insert(person)
    
    def delete_person(self, person):
        # es müssen natürlich auch noch aus allen anderen Tabellen die Einträge gelöscht werden!
        with RequestMapper() as mapper:
            mapper.delete_by_person(person.get_id())
        with GroupRequestMapper() as mapper:
            mapper.delete_group_by_person(person.get_id())
        with GroupMapper() as mapper:
            mapper.leave_all_groups(person.get_id())
        with PersonMapper() as mapper:
            mapper.delete(person.get_id())
        self.delete_profile(person.get_id())         # das Profil muss natürlich auch geslöscht werden
        return 'successfull'

    ''' Verknüpft ein Profil mit einer Person '''
    def link_person_profile(self, personID, profileID):
        with PersonMapper() as mapper:
            return mapper.link_person_profile(personID, profileID)

    ''' Methoden für alle Profilobjekte '''
    def get_profile(self, id):
        with ProfileMapper() as mapper:
            return mapper.find_by_key(id)
    
    def save_profile(self, profile):
        with ProfileMapper() as mapper:
            return mapper.update(profile)

    def add_profile(self, profile):
        with ProfileMapper() as mapper:
            return mapper.insert(profile)
    
    def delete_profile(self, profileID):
        with ProfileMapper() as mapper:
            mapper.delete(profileID)

    ''' Methoden für Nachrichtenobjekte '''
    def get_message(self, sender, recipient):
        with ChatMapper() as mapper:
            return mapper.find_by_sender(sender, recipient)
    
    def add_message(self, message):
        with ChatMapper() as mapper:
            return mapper.insert(message)

    def get_chatList(self, senderID):
        ''' Von allen Chatpartnern einer Person die Personenobjekte laden '''
        result = []
        with ChatMapper() as mapper:
            chatList = mapper.find_all(senderID)
        with PersonMapper() as mapper:
            for i in chatList:
                result.append(mapper.find_by_key(i))
        return result

    def get_groupList(self, personID):
        ''' Von allen Gruppen einer Person die Gruppenobjekte laden '''
        result = []
        with GroupChatMapper() as mapper:
            groupList = mapper.find_all(personID)
        with GroupMapper() as mapper:
            for i in groupList:
                result.append(mapper.find_by_key(i))
        return result

    def get_group(self, id):
        with GroupMapper() as mapper:
            return mapper.find_by_key(id)

    def update_group(self, group):
        with GroupMapper() as mapper:
            return mapper.update(group)

    def add_group(self, group, personID):
        ''' Eine neue Gruppe erstellen
        Das Gruppenobjekt enthält zuerst die profileID der Person, damit wird das Profil erstellt
        Das neue Profil wird dann als profileID der neuen Gruppe gesetzt und ebenfalls gespeichert
        Zum Schluss wird die Gruppe mit der Person verknüpft
        '''
        profile = self.get_profile(group.get_profileID())

        profile = self.add_profile(profile)
        group.set_profileID(profile.get_id())
    
        with GroupMapper() as mapper:
            group = mapper.insert(group)

        self.add_group_member(group.get_id(), personID)
        return group

    def add_group_member(self, groupID, personID):
        with GroupMapper() as mapper:
            return mapper.insert_member(groupID, personID)
    
    def leave_group(self, group, person):
        with GroupMapper() as mapper:
            mapper.remove_member(group.get_id(), person.get_id())
            result = mapper.check_group(group.get_id())

        # wenn die Gruppe leer ist, soll sie mit dem zugehörigen Profil gelöscht werden
        if result == False:
            with GroupChatMapper() as mapper:
                mapper.delete(group.get_id())
            with GroupRequestMapper() as mapper:
                mapper.delete_by_group(group.get_id())
            with GroupMapper() as mapper:
                mapper.delete(group.get_id())
            self.delete_profile(group.get_profileID())

    ''' Methoden für Gruppennachrichtenobjekte '''
    def get_group_message(self, id):
        with GroupChatMapper() as mapper:
            return mapper.find_by_sender(id)

    def add_group_message(self, message):
        with GroupChatMapper() as mapper:
            return mapper.insert(message)
    
    ''' Methoden für Personenanfragen '''
    def add_request(self, sender, recipient):
        with RequestMapper() as mapper:
            return mapper.insert(sender, recipient)

    def get_requests(self, id):
        result = []
        with RequestMapper() as mapper:
            personList = mapper.find_all(id)    # Liste mit allen Personen-IDs

        with PersonMapper() as mapper:
            for i in personList:
                result.append(mapper.find_by_key(i))    # Liste mit den Personen-BOs
        return result
    
    def deny_request(self, sender, recipient):
        with RequestMapper() as mapper:
            mapper.delete(sender, recipient)

    def accept_request(self, sender, recipient):
        ''' Eine Anfrage annehmen
        Es wird ein Standard-Nachrichtenobjekt erstellt, damit beide Personen einen Chat haben
        Anschließend wird die Anfrage gelöscht '''
        message = Message()
        message.set_content('Willkommen im Chat')
        message.set_sender(sender)
        message.set_recipient(recipient)
        self.add_message(message)
        self.deny_request(sender, recipient)

    ''' Methoden für alle Gruppenanfragen '''
    def add_group_request(self, sender, group):
        with GroupRequestMapper() as mapper:
            return mapper.insert(sender, group)

    def get_group_requests(self, id):
        result = []
        with GroupMapper() as mapper:
            groupList = mapper.find_groups_of_person(id)
        with GroupRequestMapper() as mapper:
            for i in groupList:
                item = mapper.find_all(i)
                if item:
                    result.append(item)
        return result

    def deny_group_request(self, sender, groupID):
        with GroupRequestMapper() as mapper:
            mapper.delete(sender, groupID)
    
    def accept_group_request(self, sender, groupID):
        self.add_group_member(groupID, sender)
        self.deny_group_request(sender, groupID)


    def match(self, personID):
        ''' Matching-Algorithmus um Lernpartner zu finden
        Logik:
        1. Das Profil der angemeldeten Person auslesen => myProfile
        2. alle anderen Profile aus der DB auslesen => profileList
        3. Die Ähnlichkeit der Profile wird durch einen int-Wert repräsentiert, der sich bei gleichen Attributen erhöht
        4. durch die profileList iterieten und jedes Attribut vergleichen um so den Wert festzulegen
        5. Feststellen, ob das Profil zu einer Person oder einer Gruppe gehört
        6. Die Personen und Gruppen ausschließen, für die bereits Chats oder Anfragen bestehen
        7. Die Personen und die Gruppen getrennt zurückgeben
        '''

        with PersonMapper() as mapper:
            profileID = mapper.find_by_key(personID).get_profileID()
        with ProfileMapper() as mapper:
            myProfile = mapper.find_by_key(profileID)    # das Profil der angemeldeten Person
            profileList = mapper.find_all(profileID)     # alle anderen Profile aus der Datenbank (Person + Gruppen)
 
        result = []         # Liste mit den Profilen, die gematcht werden
        personList = []     # Liste mit den Personen
        groupList = []      # Liste mit den Gruppen

        for profile in profileList:
            value = 0   # Wert, der beschreibt wie ähnlich sich die Profile sind

            if profile.get_course() == myProfile.get_course():
                value += 2
            if profile.get_studytype() == myProfile.get_studytype():
                value += 2
            if abs(profile.get_extroverted() - myProfile.get_extroverted()) == 0:
                value += 2
            else:
                value += 1
            if abs(profile.get_frequency() - myProfile.get_frequency()) == 0:
                value += 2
            else:
                value += 1
            if profile.get_online() == myProfile.get_online():
                value += 1
            elif profile.get_online() == 'beides' or profile.get_online() == 'beides':
                value += 1
            if profile.get_interest() == myProfile.get_interest():
                value += 2

            # ab einem Wert von 4 kann man von recht ähnlichen Profilen sprechen
            if value >= 4:
                result.append(profile)

            # max. 7 Vorschläge reichen (vorerst)
            if len(result) == 7:
                break

        requestList = []
        groupRequestList = []
        chatList = []

        with RequestMapper() as mapper:
            requestList = mapper.find_by_person(personID)
        with GroupRequestMapper() as mapper:
            groupRequestList = mapper.find_by_person(personID)
        with ChatMapper() as mapper:
            chatList = mapper.find_by_person(personID)

        # Es muss noch zwischen Person und Gruppe unterscheiden werden
        for profile in result:
            with PersonMapper() as mapper:
                person = mapper.find_by_profileID(profile.get_id())
            if person != None:
                personList.append(person)
            else:
                # es handelt sich um ein Gruppenobjekt
                with GroupMapper() as mapper:
                    group = mapper.find_by_profileID(profile.get_id())
                    groupList.append(group)

        # wenn schon eine Anfrage oder ein Chat mit einer Person oder Gruppe besteht, sollen sie ausgeschlossen werden
        # der 'hack' mit der Funktion im for-loop verhindert den ValueError wenn versucht wird, dasselbe Element zweimal zu löschen
        for person in personList[:]:
            def check_person():
                for i in requestList:
                    if person.get_id() in i and personID in i:
                        personList.remove(person)
                        return
                for i in chatList:
                    if person.get_id() in i and personID in i:
                        personList.remove(person)
            check_person()

        for group in groupList[:]:
            def check_group():
                with GroupMapper() as mapper:
                    if personID in mapper.find_members(group.get_id()):
                        groupList.remove(group)
                        return
                for i in groupRequestList:
                    if group.get_id() in i and personID in i:
                        groupList.remove(group)
            check_group()

        return (personList, groupList)