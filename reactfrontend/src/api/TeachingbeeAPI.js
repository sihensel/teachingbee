import PersonBO from './PersonBO';
import ProfileBO from './ProfileBO';
<<<<<<< HEAD
=======
import MessageBO from './MessageBO';
import GroupMessageBO from './GroupMessageBO';
>>>>>>> main
import GroupBO from './GroupBO';

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton. 
 */
export default class TeachingbeeAPI {

  // Singelton instance
  static #api = null;

  // Local Python backend
  #ServerBaseURL = '/teachingbee';

  #addPersonURL = () => `${this.#ServerBaseURL}/persons`;
  #getPersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #updatePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #deletePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;

  #LinkURL = () => `${this.#ServerBaseURL}/link`;

  #addProfileURL = () => `${this.#ServerBaseURL}/profiles`;
  #getProfileURL = (id) => `${this.#ServerBaseURL}/profile/${id}`;
  #updateProfileURL = (id) => `${this.#ServerBaseURL}/profile/${id}`;

  #InterestsURL = () => `${this.#ServerBaseURL}/interests`;

<<<<<<< HEAD
  #addGroupURL = () => `${this.#ServerBaseURL}/groups`;
  #getGroupByMemberURL = (id) => `${this.#ServerBaseURL}/groups/${id}`;
  #getGroupURL = (id) => `${this.#ServerBaseURL}/group/${id}`;
  #updateGroupURL = (id) => `${this.#ServerBaseURL}/group/${id}`;
  #deleteGroupURL = (id) => `${this.#ServerBaseURL}/group/${id}`;
=======
  #getMessageURL = (sender, recipient) => `${this.#ServerBaseURL}/chat/${sender}/${recipient}`;
  #addMessageURL = (sender, recipient) => `${this.#ServerBaseURL}/chat/${sender}/${recipient}`;

  #getGroupMessageURL = (id) => `${this.#ServerBaseURL}/groupchat/${id}`;
  #addGroupMessageURL = (id) => `${this.#ServerBaseURL}/groupchat/${id}`;

  #getChatListURL = (id) => `${this.#ServerBaseURL}/chatlist/${id}`;
  #getGroupListURL = (id) => `${this.#ServerBaseURL}/grouplist/${id}`;
  #getGroupURL = (id) => `${this.#ServerBaseURL}/group/${id}`;

  #MatchPersonURL = (id) => `${this.#ServerBaseURL}/match-person/${id}`;
  #MatchGroupURL = (id) => `${this.#ServerBaseURL}/match-group/${id}`;
>>>>>>> main


  static getAPI() {
    if (this.#api == null) {
      this.#api = new TeachingbeeAPI();
    }
    return this.#api;
  }

  /**
   *  Returns a Promise which resolves to a json object. 
   *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
   *  fetchAdvanced throws an Error also an server status errors
   */
  #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    })


  /**
   * Returns a Promise, which resolves to a PersonBO
   *
   * @param {Number} personID to be retrieved
   * @public
   */
  getPerson(personID) {
    return this.#fetchAdvanced(this.#getPersonURL(personID)).then((responseJSON) => {
      let person = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(person)
      })
    })
  }
  // Person speichern
  updatePerson(personBO) {
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

  getProfile(profileID) {
    return this.#fetchAdvanced(this.#getProfileURL(profileID)).then((responseJSON) => {
      let profile = ProfileBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(profile)
      })
    })
  }

  deletePerson(personBO) {
    return this.#fetchAdvanced(this.#deletePersonURL(personBO.getID()), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    })
  }

  // Profil speichern
  updateProfile(profileBO) {
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
    return this.#fetchAdvanced(this.#InterestsURL()).then((response) => {
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  } 

  link_person_profile(personID, profileID) {
    return this.#fetchAdvanced(this.#LinkURL(), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ 'personID': personID, 'profileID': profileID })
    }).then((responseJSON) => {
      //let responsePersonBO = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  getMessage(sender, recipient) {
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

  getGroup(id) {
    return this.#fetchAdvanced(this.#getGroupURL(id)).then((responseJSON) => {
      let group = GroupBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
         resolve(group)
       })
    })
  }

  matchPerson(id) {
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

  getGroup(groupID) {
    return this.#fetchAdvanced(this.#getGroupURL(groupID)).then((responseJSON) => {
      let group = GroupBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(group)
      })
    })
  }

  getGroupByMember(personID) {
    return this.#fetchAdvanced(this.#getGroupByMemberURL(personID)).then((response) => {
      var groups = [];
      for (let i of response){
        groups.push(GroupBO.fromJSON(i));
      }
      return new Promise(function (resolve) {
        resolve(groups)
      })
    })
  }

  deleteGroup(groupBO) {
    return this.#fetchAdvanced(this.#deleteGroupURL(groupBO.getID()), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(groupBO)
    })
  }

  // Profil speichern
  updateGroup(groupBO) {
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

  addGroup(groupBO) {
    return this.#fetchAdvanced(this.#addGroupURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        'gname':groupBO.getGname(),
        'admin' :groupBO.getAdmin(),
        'members' :groupBO.getMembers()

      })
    })
      
    
  }
}
