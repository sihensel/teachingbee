import BusinessObject from './BusinessObject';

export default class PersonBO extends BusinessObject {

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

  static fromJSON(person) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(person, PersonBO.prototype);
    return p;
  }
}