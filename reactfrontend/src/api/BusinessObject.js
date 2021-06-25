/**
 * Basisklasse für alle Klassen
 */
export default class BusinessObject {

  constructor() {
    this.id = 0;
    this.stamp = 0;
    this.name = '';
  }

  setID(id) {
    // ID setzen
    this.id = id;
  }

  getID() {
    // ID auslesen
    return this.id;
  }
  
  setName(name) {
    // Name setzen
    this.name = name
  }
  getName() {
    // Name auslesen
    return this.name
  }

  setStamp(stamp) {
    // Stamp setzen
    this.stamp = stamp
  }
  getStamp() {
    // Stamp auslesen
    return this.stamp
  }
}