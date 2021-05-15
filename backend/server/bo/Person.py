import server.bo.BusinessObject as bo

class Person(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._fname = ''
        self._lname = ''
        self._birthdate = ''
        self._age = 0
        self._semester = 0
        self._gender = ''

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

    #def get_age(self):
    #    self._age = datetime.now().year - self._birthdate.year
    #   return self._age

    def set_semester(self, semester):
        self._semester = semester

    def get_semester(self):
        return self._semester

    def set_gender(self, gender):
        self._gender = gender

    def get_gender(self):
        return self._gender

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Person()."""
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_fname(dictionary["fname"])
        obj.set_lname(dictionary["lname"])
        obj.set_birthdate(dictionary["birthdate"])
        obj.set_semester(dictionary["semester"])
        obj.set_gender(dictionary["gender"])
        return obj