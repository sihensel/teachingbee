import BusinessObject as bo
from datetime import datetime
from server.db.PersonMapper import PersonMapper

class Person(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._id = 0
        self._timestamp = datetime.now() - datetime.now()
        self._fname = ''
        self._lname = ''
        self._birthdate = datetime.now() - datetime.now()
        self._age = 0
        self._semester = 0
        self._gender = ''
        self._sent_request = []
        self._received_request = []

    def set_id(self, id):
        self._id = id

    def get_id(self):
        return self._id

    def get_timestamp(self):
        return self._timestamp

    def set_birthdate(self, birthdate):
        self._birthdate = birthdate

    def get_age(self):
        self._age = datetime.now().year - self._birthdate.year
        return self._age

    def set_gender(self, gender):
        self._gender = gender

    def get_gender(self):
        return self._gender

    def set_semester(self, semester):
        self._semester = semester

    def get_semester(self):
        return self._semester

    def set_fname(self, fname):
        self._fname = fname

    def get_fname(self):
        return self._fname

    def set_lname(self, lname):
        self._lname = lname

    def get_lname(self):
        return self._lname

    def save_person(self):
        if self._id != 0:
            PersonMapper.update(self)
        elif self._id == 0:
            PersonMapper.insert(self)

    def delete_person(self):
        PersonMapper.delete(self)

hallo = Person()
hallo.set_birthdate(datetime(2005,1,1))
print(hallo.get_age())
