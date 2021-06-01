import server.bo.BusinessObject as bo


class Group(bo.BusinessObject):
    def __init__(self):
        super().__init__()

        self._members = []
        self._admin = ""
        self._recieved_requests = []
        self._chat = "missing"
        self._gname = ""
        self._id = 0
        self._profileID = 0

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
        self._admin = admin

    def get_admin(self):
        return self._admin

    def set_gname(self, name):
        self._gname = name

    def get_gname(self):
        return self._gname

    def set_profileID(self, id):
        self._profileID = id

    def get_profileID(self):
        return 0
