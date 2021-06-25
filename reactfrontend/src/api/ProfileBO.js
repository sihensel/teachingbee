import BusinessObject from './BusinessObject';

export default class ProfileBO extends BusinessObject {

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

  static fromJSON(profile) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(profile, ProfileBO.prototype);
    return p;
  }
}