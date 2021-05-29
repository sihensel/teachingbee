from .bo.Person import Person
from .bo.Profile import Profile

from .db.PersonMapper import PersonMapper
from .db.ProfileMapper import ProfileMapper
from .db.InterestMapper import InterestMapper

class BusinessLogic:
    def __init__(self):
        pass

    ''' Methoden für die Interessen '''
    def get_all_interests(self):
        with InterestMapper() as mapper:
            return mapper.find_all()
    
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
        self.delete_profile(person)

    def link_person_profile(self, personID, profileID):
        with PersonMapper() as mapper:
            mapper.link_person_profile(personID, profileID)

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
