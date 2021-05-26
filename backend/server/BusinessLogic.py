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

    def get_profile(self, id):
        with ProfileMapper() as mapper:
            return mapper.find_by_key(id)