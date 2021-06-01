import BusinessObject from './BusinessObject';

/**
 * Represents a Profile of a Person
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

  setCourse(course) {
    this.course = course;
  }

  getCourse() {
    return this.course;
  }

  setStudytype(studytype) {
      this.studytype = studytype;
  }
  getStudytype() {
      return this.studytype;
  }

  setExtroverted(extroverted) {
    this.extroverted = extroverted;
  }

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
   * Returns an Object from a JSON
   */
  static fromJSON(profile) {
    let p = Object.setPrototypeOf(profile, ProfileBO.prototype);
    return p;
  }
}