import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class ProfileBO extends BusinessObject {

  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   * 
   * @param {String} fname - the firstname of this CustomerBO.
   * @param {String} lanme - the firstname of this CustomerBO.
   * @param {String} birthdate - the firstname of this CustomerBO.
   * @param {String} age - the firstname of this CustomerBO.
   * @param {String} semester - the firstname of this CustomerBO.
   * @param {String} gender - the firstname of this CustomerBO.
   * @param {String} profileID - the firstname of this CustomerBO.
   */
  constructor(course, studytype, extroverted, frequency, online) {
    super();
    this.course = course;
    this.studytype = studytype;
    this.extroverted = extroverted;
    this.frequency = frequency;
    this.online = online;
  }

  /**
   * Sets a new firstname.
   * 
   * @param {String} fname - the new firstname of this CustomerBO.
   */
  setCourse(course) {
    this.course = course;
  }

  /**
   * Gets the firstname.
   */
  getCourse() {
    return this.course;
  }

  setStudytype(studytype) {
      this.studytype = studytype;
  }
  getStudytype() {
      return this.studytype;
  }

  /**
   * Sets a new lastname.
   * 
   * @param {String} lname - the new lastname of this CustomerBO.
   */
  setExtroverted(extroverted) {
    this.extroverted = extroverted;
  }

  /**
   * Gets the lastname.
   */
  getExtroverted() {
    return this.extroverted;
  }


  setFrequency(frequency) {
      this.frequency = frequency;
  }
  getFrequency() {
      return this.frequency;
  }

  setOnline(online) {
      this.online = online;
  }
  getOnline() {
      return this.online;
  }

  /** 
   * Returns an Array of CustomerBOs from a given JSON structure.
   */
  static fromJSON(profile) {
    let p = Object.setPrototypeOf(profile, ProfileBO.prototype);
    return p;
  }
}