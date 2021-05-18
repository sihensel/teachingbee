import server.bo.BusinessObject as bo
from datetime import datetime

class Person(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._fname = ''
        self._lname = ''
        self._birthdate = ''
        self._age = 0
        self._semester = 0
        self._gender = ''
        self._profileID = 0

    def set_fname(self, fname):
        self._fname = fname

    def get_fname(self):
        return self._fname

    def set_lname(self, lname):
        self._lname = lname

    def get_lname(self):
        return self._lname
    
    def set_birthdate(self, birthdate):
        self._birthdate = birthdate

    def get_birthdate(self):
        return self._birthdate

    def get_age(self):
        self._age = datetime.now().year - self._birthdate.year
        return self._age

    def set_semester(self, semester):
        self._semester = semester

    def get_semester(self):
        return self._semester

    def set_gender(self, gender):
        self._gender = gender

    def get_gender(self):
        return self._gender
        
    def set_profileID(self, profileID):
        self._profileID = profileID

    def get_profileID(self):
        return self._profileID

    def __str__(self):
        ''' Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz. '''
        return f'Profile: {self.get_id()}, {self._fname}, {self._lname}, {self._birthdate}, {self._semester}, {self._gender}, {self._profileID}'

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Person()."""
        obj = Person()
        obj.set_id(dictionary["id"])
        obj.set_fname(dictionary["fname"])
        obj.set_lname(dictionary["lname"])
        obj.set_birthdate(dictionary["birthdate"])
        obj.set_semester(dictionary["semester"])
        obj.set_gender(dictionary["gender"])
        obj.set_profileID(dictionary["profileID"])
        return obj