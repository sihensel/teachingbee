import server.bo.BusinessObject as bo


class Profile (bo.BusinessObject):
    """Realisierung einer exemplarischen Kundenklasse.

    Aus Gründen der Vereinfachung besitzt der Kunden in diesem Demonstrator
    lediglich einen Vornamen und einen Nachnamen.
    """
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
        return self._interest

    def set_interest(self, value):
        self._interest = value

    def __str__(self):
        ''' Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz. '''
        return f"Profile: {self.get_id()}, {self._course}, {self._studytype}, {self._extroverted}, {self._frequency}, {self._online}, {self._interest}"

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Customer()."""
        obj = Profile()
        obj.set_id(dictionary["id"])
        obj.set_course(dictionary["course"])
        obj.set_studytype(dictionary["studytype"])
        obj.set_extroverted(dictionary["extroverted"])
        obj.set_frequency(dictionary["frequency"])
        obj.set_online(dictionary["online"])
        obj.set_interest(dictionary['interest'])
        return obj