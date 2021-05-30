/**
 * Base class for all BusinessObjects, which has an ID field by default.
 */
export default class BusinessObject {

  constructor() {
    this.id = 0;
    this.stamp = 0;
    this.name = '';
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }
  
  setName(name) {
      this.name = name
  }
  getName() {
      return this.name
  }

  setStamp(stamp) {
      this.stamp = stamp
  }
  getStamp() {
      return this.stamp
  }
  

  /**
   * Returns a string representation of this Object. This is useful for debugging purposes.
   */
  toString() {
    let result = '';
    for (var prop in this) {
      result += prop + ': ' + this[prop] + ' ';
    }
    return result;
  }
}