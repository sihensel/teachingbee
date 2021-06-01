import server.bo.BusinessObject as bo

class Message(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._content = ""
        self._sender = 0
        self._receiver = 0


    def set_content(self, content):
        self._content = content

    def get_content(self):
        return self._content

    def set_sender(self, sender):
        self._sender = sender

    def get_sender(self):
        return self._sender

    def set_recipient(self, recipient):
        self._recipient = recipient

    def get_recipient(self):
        return self._recipient
    
    def __str__(self):
        ''' Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz. '''
        return f'Message: {self.get_id()}, {self.get_stamp}, {self.get_content}, {self.get_sender}, {self.get_recipient}'

    """
    @staticmethod
    def from_dict(dictionary=dict()):
        Umwandeln eines Python dict() in eine Person().
        obj = Person()
        obj.set_id(dictionary["id"])
        obj.set_fname(dictionary["fname"])
        obj.set_lname(dictionary["lname"])
        obj.set_birthdate(dictionary["birthdate"])
        obj.set_semester(dictionary["semester"])
        obj.set_gender(dictionary["gender"])
        obj.set_profileID(dictionary["profileID"])
        return obj
    """