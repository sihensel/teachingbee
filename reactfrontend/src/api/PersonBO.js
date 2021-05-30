import BusinessObject from './BusinessObject';

/**
 * Represents a person
 */
export default class PersonBO extends BusinessObject {

  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   * 
   * @param {String} fname - the firstname of this CustomerBO.
   * @param {String} lname - the firstname of this CustomerBO.
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

  setFname(fname) {
    this.fname = fname;
  }

  getFname() {
    return this.fname;
  }

  setLname(lname) {
    this.lname = lname;
  }

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

  setProfileID(profileID) {
    this.profileID = profileID;
  }

  getProfileID() {
    return this.profileID;
  }
  /** 
   * Returns an Object from a JSON
   */
  static fromJSON(person) {
    let p = Object.setPrototypeOf(person, PersonBO.prototype);
    return p;
  }
}