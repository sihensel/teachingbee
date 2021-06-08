import server.bo.BusinessObject as bo


class Group(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._info = ""
        self._profileID = 0

    def set_info(self, info):
        self._info = info
    
    def get_info(self):
        return self._info
    
    def set_profileID(self, id):
        self._profileID = id

    def get_profileID(self):
        return self._profileID

    def __str__(self):
        ''' Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz. '''
        return f'Group: {self.get_id()}, {self.get_name()}, {self.get_info()}, {self.get_profileID()}'

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Group()."""
        obj = Group()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_info(dictionary["info"])
        obj.set_profileID(dictionary["profileID"])
        return obj
