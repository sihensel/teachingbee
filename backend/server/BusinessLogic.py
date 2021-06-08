from re import S
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
    
    def save_person(self, person):
        with PersonMapper() as mapper:
            return mapper.update(person)
    
    def add_person(self, person):
        with PersonMapper() as mapper:
            return mapper.insert(person)
    
    def delete_person(self, person):
        # es müssen natürlich auch noch aus allen anderen Tabellen die Einträge gelöscht werden!
        with PersonMapper() as mapper:
            mapper.delete(person.get_id())
        self.delete_profile(person)         # das Profil muss natürlich auch geslöscht werden
        return 'successfull'

    ''' Verknüpft ein Profil mit einer Person '''
    def link_person_profile(self, personID, profileID):
        with PersonMapper() as mapper:
            mapper.link_person_profile(personID, profileID)

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
    
    def delete_profile(self, person):
        with ProfileMapper() as mapper:
            mapper.delete(person.get_profileID())

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

    ''' Methoden für Gruppennachrichtenobjekte '''
    def get_group_message(self, id):
        with GroupChatMapper() as mapper:
            return mapper.find_by_sender(id)

    def add_group_message(self, message):
        with GroupChatMapper() as mapper:
            return mapper.insert(message)
    
    def match(self, personID):
        ''' Matching-Algorithmus um Lernpartner zu finden
        Logik:
        1. Das Profil der angemeldeten Person auslesen => myProfile
        2. alle anderen Profile aus der DB auslesen => profileList
        3. Die Ähnlichkeit der Profile wird durch einen int-Wert repräsentiert, der sich bei gleichen Attributen erhöht
        4. durch die profileList iterieten und jedes Attribut vergleichen um so den Wert festzulegen
        5. Feststellen, ob das Profil zu einer Person oder einer Gruppe gehört
        6. Die Personen und die Gruppen getrennt zurückgeben
        '''

        with ProfileMapper() as mapper:
            myProfile = mapper.find_by_key(personID)    # das Profil der angemeldeten Person
            profileList = mapper.find_all(personID)     # alle anderen Profile aus der Datenbank (Person + Gruppen)

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

            # ab einem Wert von 5 kann man von recht ähnlichen Profilen sprechen
            if value >= 5:
                result.append(profile)

            # max. 5 Vorschläge reichen (vorerst)
            if len(result) == 5:
                break

        # Es muss noch zwischen Person und Gruppe unterscheiden werden
        for profile in result:
            with PersonMapper() as mapper:
                person = mapper.find_by_profileID(profile.get_id())
            if person != None:
                personList.append(person)
            else:
                with GroupMapper() as mapper:
                    group = mapper.find_by_profileID(profile.get_id())
                    groupList.append(group)

        return (personList, groupList)
