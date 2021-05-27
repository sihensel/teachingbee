import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class PersonBO extends BusinessObject {

  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   * 
   * @param {String} fname - the firstname of this CustomerBO.
   * @param {String} lanme - the firstname of this CustomerBO.
   * @param {String} birthdate - the firstname of this CustomerBO.
   * @param {String} semester - the firstname of this CustomerBO.
   * @param {String} gender - the firstname of this CustomerBO.
   * @param {String} profileID - the firstname of this CustomerBO.
   */
  constructor(fname, lname, birthdate, semester, gender, profileID) {
    super();
    this.fname = fname;
    this.lname = lname;
    this.birthdate = birthdate;
    this.semester = semester;
    this.gender = gender;
    this.profileID = profileID;
  }

  /**
   * Sets a new firstname.
   * 
   * @param {String} fname - the new firstname of this CustomerBO.
   */
  setFname(fname) {
    this.fname = fname;
  }

  /**
   * Gets the firstname.
   */
  getFname() {
    return this.fname;
  }

  /**
   * Sets a new lastname.
   * 
   * @param {String} lname - the new lastname of this CustomerBO.
   */
  setLname(lname) {
    this.lname = lname;
  }

  /**
   * Gets the lastname.
   */
  getLname() {
    return this.lname;
  }

  setBirthdate(birthdate) {
      this.birthdate = birthdate;
  }
  getBirthdate() {
      return this.birthdate;
  }

  setSemester(semester) {
      this.semester = semester;
  }
  getSemester() {
      return this.semester;
  }

  setGender(gender) {
      this.gender = gender;
  }
  getGender() {
      return this.gender;
  }

  // die ProfileID kann nur ausgelesen werden
  getProfileID() {
      return this.profileID;
  }
  /** 
   * Returns an Array of CustomerBOs from a given JSON structure.
   */
  static fromJSON(person) {
    let p = Object.setPrototypeOf(person, PersonBO.prototype);
    return p;
  }
}