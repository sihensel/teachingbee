import PersonBO from './PersonBO';
import ProfileBO from './ProfileBO';

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton. 
 * 
 * @author [lala lulu](https://github.com/lalalulu)
 */
export default class TeachingbeeAPI {

  // Singelton instance
  static #api = null;


  // Local Python backend
  #ServerBaseURL = '/teachingbee';

  // Local http-fake-backend 
  //#bankServerBaseURL = '/api/bank';

  // Person related
  #addPersonURL = () => `${this.#ServerBaseURL}/persons`;
  #getPersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #updatePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #deletePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  //#searchPersonURL = (personName) => `${this.#bankServerBaseURL}/customers-by-name/${personName}`;
  #addProfileURL = () => `${this.#ServerBaseURL}/profiles`;
  #getProfileURL = (id) => `${this.#ServerBaseURL}/profile/${id}`;
  #updateProfileURL = (id) => `${this.#ServerBaseURL}/profile/${id}`;
  #InterestsURL = () => `${this.#ServerBaseURL}/interests`;
  #LinkURL = () => `${this.#ServerBaseURL}/link`;


  /** 
   * Get the Singelton instance 
   * 
   * @public
   */
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
      //return res.text();
    }
    )


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
        resolve (responsePersonBO);
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
        resolve (responsePersonBO);
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
        resolve (responseProfileBO);
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
        resolve (responseProfileBO);
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
      body: JSON.stringify({'personID': personID, 'profileID': profileID})
    }).then((responseJSON) => {
      //let responsePersonBO = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve (responseJSON);
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

  // --- ab hier alter Krempel ---
















  /**
   * Returns a Promise, which resolves to an Array of AccountBOs
   * 
   * @param {Number} customerID to be deleted
   * @public
   */
  /*
  deleteCustomer(customerID) {
    return this.#fetchAdvanced(this.#deleteCustomerURL(customerID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseCustomerBO = CustomerBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseCustomerBO);
      })
    })
  }
  */

  /**
   * Returns a Promise, which resolves to an Array of AccountBOs
   * 
   * @param {Number} customerID to be deleted
   * @public
   */
  /*
  searchCustomer(customerName) {
    return this.#fetchAdvanced(this.#searchCustomerURL(customerName)).then((responseJSON) => {
      let customerBOs = CustomerBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(customerBOs);
      })
    })
  }
  */
}