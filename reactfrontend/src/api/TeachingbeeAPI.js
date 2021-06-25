import PersonBO from './PersonBO';
import ProfileBO from './ProfileBO';
import MessageBO from './MessageBO';
import GroupMessageBO from './GroupMessageBO';
import GroupBO from './GroupBO';

export default class TeachingbeeAPI {

  static #api = null;

  // URL des Flask Servers
  #ServerBaseURL = '/teachingbee';

  #addPersonURL = () => `${this.#ServerBaseURL}/persons`;
  #getPersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #updatePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #deletePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #getPersonByFirebaseURL = (id) => `${this.#ServerBaseURL}/firebase/${id}`;
  #addPersonFirebaseURL = (id) => `${this.#ServerBaseURL}/firebase/${id}`;

  #LinkURL = () => `${this.#ServerBaseURL}/link`;

  #addProfileURL = () => `${this.#ServerBaseURL}/profiles`;
  #getProfileURL = (id) => `${this.#ServerBaseURL}/profile/${id}`;
  #updateProfileURL = (id) => `${this.#ServerBaseURL}/profile/${id}`;

  #InterestsURL = () => `${this.#ServerBaseURL}/interests`;

  #getMessageURL = (sender, recipient) => `${this.#ServerBaseURL}/chat/${sender}/${recipient}`;
  #addMessageURL = (sender, recipient) => `${this.#ServerBaseURL}/chat/${sender}/${recipient}`;

  #getGroupMessageURL = (id) => `${this.#ServerBaseURL}/groupchat/${id}`;
  #addGroupMessageURL = (id) => `${this.#ServerBaseURL}/groupchat/${id}`;

  #getChatListURL = (id) => `${this.#ServerBaseURL}/chatlist/${id}`;
  #getGroupListURL = (id) => `${this.#ServerBaseURL}/grouplist/${id}`;

  #leaveGroupURL = (id) => `${this.#ServerBaseURL}/grouplist/${id}`;
  #addGroupURL = () => `${this.#ServerBaseURL}/groups`;
  #getGroupURL = (id) => `${this.#ServerBaseURL}/group/${id}`;
  #updateGroupURL = (id) => `${this.#ServerBaseURL}/group/${id}`;

  #MatchPersonURL = (id) => `${this.#ServerBaseURL}/match-person/${id}`;
  #MatchGroupURL = (id) => `${this.#ServerBaseURL}/match-group/${id}`;

  #getRequestsURL = (id) => `${this.#ServerBaseURL}/requests/${id}`;
  #addRequestsURL = (id) => `${this.#ServerBaseURL}/requests/${id}`;
  #deleteRequestsURL = (id) => `${this.#ServerBaseURL}/requests/${id}`;

  #getGroupRequestsURL = (id) => `${this.#ServerBaseURL}/grouprequests/${id}`;
  #addGroupRequestsURL = (id) => `${this.#ServerBaseURL}/grouprequests/${id}`;
  #deleteGroupRequestsURL = (id) => `${this.#ServerBaseURL}/grouprequests/${id}`;

  static getAPI() {
    if (this.#api == null) {
      this.#api = new TeachingbeeAPI();
    }
    return this.#api;
  }

  /**
   *  holt sich das JSON von Flask und gibt es als Promise zurück
   */
  #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
      // wird auch bei HTTP Error 401 und 500 ausgeführt
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    })

  /*
  Die nachfolgendenden Funktionen rufen eine URL des Flask Servers auf und geben das JSON als Promise zurück
  */
  getPerson(personID) {
    // Person abfragen
    return this.#fetchAdvanced(this.#getPersonURL(personID)).then((responseJSON) => {
      let person = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(person)
      })
    })
  }

  getPersonByFirebase(firebaseID) {
    // Person anhand der FirebaseID auslesen
    return this.#fetchAdvanced(this.#getPersonByFirebaseURL(firebaseID)).then((responseJSON) => {
      let person = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(person)
      })
    })
  }

  addPersonFirebase(personID, firebaseID) {
    // Person einer FirebaseID zuweisen
    return this.#fetchAdvanced(this.#addPersonFirebaseURL(firebaseID), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ 'personID': personID, 'firebaseID': firebaseID })
    })
  }

  updatePerson(personBO) {
    // Person updaten
    return this.#fetchAdvanced(this.#updatePersonURL(personBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    }).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

  addPerson(personBO) {
    // Person neu anlegen
    return this.#fetchAdvanced(this.#addPersonURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    }).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

  deletePerson(personBO) {
    // Person löschen
    return this.#fetchAdvanced(this.#deletePersonURL(personBO.getID()), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    })
  }

  getProfile(profileID) {
    // Profil abfragen
    return this.#fetchAdvanced(this.#getProfileURL(profileID)).then((responseJSON) => {
      let profile = ProfileBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(profile)
      })
    })
  }


  updateProfile(profileBO) {
    // Profil updaten
    return this.#fetchAdvanced(this.#updateProfileURL(profileBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(profileBO)
    }).then((responseJSON) => {
      let responseProfileBO = ProfileBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseProfileBO);
      })
    })
  }

  addProfile(profileBO) {
    // Profil neu anlegen
    return this.#fetchAdvanced(this.#addProfileURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(profileBO)
    }).then((responseJSON) => {
      let responseProfileBO = ProfileBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseProfileBO);
      })
    })
  }

  getInterests() {
    // Interessen abfragen
    return this.#fetchAdvanced(this.#InterestsURL()).then((response) => {
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  } 

  link_person_profile(personID, profileID) {
    // Person mit einem Profil verknüpfen
    return this.#fetchAdvanced(this.#LinkURL(), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ 'personID': personID, 'profileID': profileID })
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  getMessage(sender, recipient) {
    // Nachrichten abfragen
    return this.#fetchAdvanced(this.#getMessageURL(sender, recipient)).then((responseJSON) => {
      let messageList = [];
      responseJSON.map(item => {
        let message = MessageBO.fromJSON(item);
        messageList.push(message);

      })
      return new Promise(function (resolve) {
         resolve(messageList);
       })
    })
  }

  addMessage(messageBO) {
    // Nachricht hinzufügen
    return this.#fetchAdvanced(this.#addMessageURL(messageBO.getSender(), messageBO.getRecipient()), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(messageBO)
    }).then((responseJSON) => {
      let responseMessageBO = MessageBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseMessageBO);
      })
    })
  }

  getGroupMessage(id) {
    // Gruppennachricht abfragen
    return this.#fetchAdvanced(this.#getGroupMessageURL(id)).then((responseJSON) => {
      let messageList = [];
      responseJSON.map(item => {
        let message = GroupMessageBO.fromJSON(item);
        messageList.push(message);
      })
      return new Promise(function (resolve) {
         resolve(messageList);
       })
    })
  }

  addGroupMessage(groupmessageBO) {
    // Gruppennachricht hinzufügen
    return this.#fetchAdvanced(this.#addGroupMessageURL(groupmessageBO.getGroup()), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(groupmessageBO)
    }).then((responseJSON) => {
      let responseMessageBO = GroupMessageBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseMessageBO);
      })
    })
  }

  getChatList(id) {
    // Liste aller Chats einer Person auslesen
    return this.#fetchAdvanced(this.#getChatListURL(id)).then((responseJSON) => {
      let chatList = [];
      responseJSON.map(item => {
        let person = PersonBO.fromJSON(item);
        chatList.push(person);
      })
      return new Promise(function (resolve) {
         resolve(chatList)
       })
    })
  }

  getGroupList(id) {
    // Liste mit Gruppen einer Person auslesen
    return this.#fetchAdvanced(this.#getGroupListURL(id)).then((responseJSON) => {
      let groupList = [];
      responseJSON.map(item => {
        let group = GroupBO.fromJSON(item);
        groupList.push(group);
      })
      return new Promise(function (resolve) {
         resolve(groupList)
       })
    })
  }

  matchPerson(id) {
    // Person matchen
    return this.#fetchAdvanced(this.#MatchPersonURL(id)).then((responseJSON) => {
      let personList = [];
      responseJSON.map(item => {
        let person = PersonBO.fromJSON(item);
        personList.push(person);
      })
      return new Promise(function (resolve) {
        resolve(personList);
      })
    })
  }

  matchGroup(id) {
    // Gruppen matchen
    return this.#fetchAdvanced(this.#MatchGroupURL(id)).then((responseJSON) => {
      let groupList = [];
      responseJSON.map(item => {
        let group = GroupBO.fromJSON(item);
        groupList.push(group);
      })
      return new Promise(function (resolve) {
        resolve(groupList);
      })
    })
  }

  getGroup(id) {
    // Gruppe abfragen
    return this.#fetchAdvanced(this.#getGroupURL(id)).then((responseJSON) => {
      let group = GroupBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
         resolve(group)
       })
    })
  }

  updateGroup(groupBO) {
    // Gruppe updaten
    return this.#fetchAdvanced(this.#updateGroupURL(groupBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(groupBO)
    }).then((responseJSON) => {
      let responseGroupBO = GroupBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve (responseGroupBO);
      })
    })
  }

  addGroup(groupBO, personBO) {
    // Gruppe neu anlegen
    return this.#fetchAdvanced(this.#addGroupURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({"group": groupBO, "personID": personBO.getID()})
    }).then((responseJSON) => {
      let responseGroupBO = ProfileBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
      })
    })
  }
      
  leaveGroup(groupBO, personBO) {
    // Gruppe verlassen
    return this.#fetchAdvanced(this.#leaveGroupURL(personBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({'group': groupBO, 'person': personBO})
    })
  }

  addRequest(senderID, recipientID) {
    // Anfragen stellen
    return this.#fetchAdvanced(this.#addRequestsURL(senderID), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({"sender": senderID, "recipient": recipientID})
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  getRequests(personID) {
    // Anfragen abfragen
    return this.#fetchAdvanced(this.#getRequestsURL(personID)).then(responseJSON => {
      let personList = [];
      responseJSON.map(item => {
        let person = PersonBO.fromJSON(item);
        personList.push(person);
      })
      return new Promise(function (resolve) {
        resolve(personList);
      })
    })
  }

  handleRequest(personID, recipientID, cmd) {
    // Anfrage bearbeiten
    return this.#fetchAdvanced(this.#deleteRequestsURL(personID), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({'sender': personID, 'recipient': recipientID, 'cmd': cmd})
    })
  }

  addGroupRequest(senderID, groupID) {
    // Gruppenanfrage stellen
    return this.#fetchAdvanced(this.#addGroupRequestsURL(senderID), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({"sender": senderID, "group": groupID})
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  getGroupRequests(personID) {
    // Gruppenanfragen auslesen
    return this.#fetchAdvanced(this.#getGroupRequestsURL(personID)).then(responseJSON => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  handleGroupRequest(personID, groupID, cmd) {
    // Gruppenanfragen bearbeiten
    return this.#fetchAdvanced(this.#deleteGroupRequestsURL(personID), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({'sender': personID, 'group': groupID, 'cmd': cmd})
    })
  }
}