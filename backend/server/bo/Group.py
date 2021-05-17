import server.bo.BusinessObject as bo


class Group(bo.BusinessObject):
    def __init__(self):
        super().__init__()

        self._members = []
        self._admin = ""
        self._recieved_requests = []
        self._chat = "missing"
        self._name = ""
        self._id = 0

    def set_id(self, id):
        self._id = id

    def get_id(self):
        return self._id
    
    def add_member(self, member):
        self._members.append(member)

    def remove_member(self, member):
        self._members.pop(self._members.index(member))

    def get_members(self):
        return self._members

    def add_request(self, request):
        self._recieved_requests.append(request)

    def resolve_request(self, request, decision):
        if decision:
            self.add_member(request.get_sender())
        self._recieved_requests.pop(self._recieved_requests.index(request))

    def set_admin(self, admin):     # admin is a Person-Object
        self._admin = admin.get_id()

    def get_admin(self):
        return self._admin

    def set_name(self, name):
        self._name = name

    def get_name(self):
        return self._name

hallo = Group()
hallo.add_member("Greta")
print(hallo.get_members())

