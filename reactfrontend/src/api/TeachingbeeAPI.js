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
  #getPersonsURL = () => `${this.#ServerBaseURL}/persons`;
  #addPersonURL = () => `${this.#ServerBaseURL}/persons`;
  #getPersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #updatePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #deletePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  //#searchPersonURL = (personName) => `${this.#bankServerBaseURL}/customers-by-name/${personName}`;
  #getProfileURL = (id) => `${this.#ServerBaseURL}/profile/${id}`;
  #updateProfileURL = (id) => `${this.#ServerBaseURL}/profile/${id}`;
  #InterestsURL = () => `${this.#ServerBaseURL}/interests`;


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
    })
  }
  getInterests() {
    return this.#fetchAdvanced(this.#InterestsURL()).then((response) => {
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  // --- ab hier alter Krempel ---











  /**
   * Returns a Promise, which resolves to an Array of PersonBOs
   * 
   * @public
   */
  getPersons() {
    return this.#fetchAdvanced(this.#getPersonsURL()).then((responseJSON) => {
      let personBOs = PersonBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(personBOs);
      })
    })
  }








  /**
   * Adds a customer and returns a Promise, which resolves to a new CustomerBO object with the 
   * firstName and lastName of the parameter customerBO object.
   * 
   * @param {CustomerBO} customerBO to be added. The ID of the new customer is set by the backend
   * @public
   */
  /*
  addCustomer(customerBO) {
    return this.#fetchAdvanced(this.#addCustomerURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(customerBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON, but only need one object
      let responseCustomerBO = CustomerBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseCustomerBO);
      })
    })
  }
  */

  /**
   * Updates a customer and returns a Promise, which resolves to a CustomerBO.
   * 
   * @param {CustomerBO} customerBO to be updated
   * @public
   */
  /*
  updateCustomer(customerBO) {
    return this.#fetchAdvanced(this.#updateCustomerURL(customerBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(customerBO)
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