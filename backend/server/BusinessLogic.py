from .bo.Person import Person
from .bo.Profile import Profile
from .bo.Message import Message

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
    
    def get_group_message(self, id):
        with GroupChatMapper() as mapper:
            return mapper.find_by_sender(id)

    def add_group_message(self, message):
        with GroupChatMapper() as mapper:
            return mapper.insert(message)