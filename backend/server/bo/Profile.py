import server.bo.BusinessObject as bo

class Profile (bo.BusinessObject):
    ''' Lernprofil einer Person oder Lerngruppe '''
    def __init__(self):
        super().__init__()
        self._course = ''
        self._studytype = ''
        self._extroverted = 0
        self._frequency = 0
        self._online = 0
        self._interest = 0

    def get_course(self):
        """Auslesen des Studiengangs."""
        return self._course

    def set_course(self, value):
        """Setzen des Studiengangs."""
        self._course = value

    def get_studytype(self):
        """Auslesen des Lerntyps."""
        return self._studytype

    def set_studytype(self, value):
        """Setzen des Lerntyps."""
        self._studytype = value
    
    def get_extroverted(self):
        """Auslesen der Extrovertiertheit."""
        return self._extroverted

    def set_extroverted(self, value):
        """Setzen der Extrovertiertheit."""
        self._extroverted = value

    def get_frequency(self):
        """Auslesen der Frequenz."""
        return self._frequency

    def set_frequency(self, value):
        """Setzen der Frequenz."""
        self._frequency = value

    def get_online(self):
        """Auslesen, ob man online lernen will."""
        return self._online

    def set_online(self, value):
        """Setzen, ob man online lernen will."""
        self._online = value

    def get_interest(self):
        ''' Interesse auslesen '''
        return self._interest

    def set_interest(self, value):
        ''' Interesse setzen '''
        self._interest = value

    def __str__(self):
        ''' Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz. '''
        return f"Profile: {self.get_id()}, {self.get_course()}, {self.get_studytype()}, {self.get_extroverted()}, {self.get_frequency()}, {self.get_online()}, {self.get_interest()}"

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Profile()."""
        obj = Profile()
        obj.set_id(dictionary["id"])
        obj.set_course(dictionary["course"])
        obj.set_studytype(dictionary["studytype"])
        obj.set_extroverted(dictionary["extroverted"])
        obj.set_frequency(dictionary["frequency"])
        obj.set_online(dictionary["online"])
        obj.set_interest(dictionary['interest'])
        return obj