import server.bo.BusinessObject as bo

class Message(bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._content = ""
        self._sender = 0
        self._recipient = 0

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
        return f'Message: {self.get_id()}, {self.get_stamp()}, {self.get_content()}, {self.get_sender()}, {self.get_recipient()}'

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Message()
        obj.set_content(dictionary["content"])
        obj.set_sender(dictionary["sender"])
        obj.set_recipient(dictionary["recipient"])
        return obj