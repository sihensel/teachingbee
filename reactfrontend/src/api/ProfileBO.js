import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class ProfileBO extends BusinessObject {

  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   * 
   * @param {String} course - the firstname of this CustomerBO.
   * @param {String} studytype - the firstname of this CustomerBO.
   * @param {String} extroverted - the firstname of this CustomerBO.
   * @param {String} frequency - the firstname of this CustomerBO.
   * @param {String} online - the firstname of this CustomerBO.
   * @param {String} interest - the firstname of this CustomerBO.
   */
  constructor(course, studytype, extroverted, frequency, online, interest) {
    super();
    this.course = course;
    this.studytype = studytype;
    this.extroverted = extroverted;
    this.frequency = frequency;
    this.online = online;
    this.interest = interest;
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

  setInterest(interest) {
    this.interest = interest;
  }
  getInterest() {
    return this.interest;
  }

  /** 
   * Returns an Array of CustomerBOs from a given JSON structure.
   */
  static fromJSON(profile) {
    let p = Object.setPrototypeOf(profile, ProfileBO.prototype);
    return p;
  }
}