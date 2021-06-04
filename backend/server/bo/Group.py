import server.bo.BusinessObject as bo


class Group(bo.BusinessObject):
    def __init__(self):
        super().__init__()

        self._profileID = 0
    
    def add_member(self, member):
        self._members.append(member)

    def remove_member(self, member):
        self._members.pop(self._members.index(member))

    def set_profileID(self, id):
        self._profileID = id

    def get_profileID(self):
        return self._profileID

    def __str__(self):
        ''' Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz. '''
        return f'Group: {self.get_id()}, {self.get_name()}, {self.get_profileID()}'
