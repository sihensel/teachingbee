import BusinessObject from './BusinessObject';

export default class GroupMessageBO extends BusinessObject {

  constructor(content, sender, group) {
    super();
    this.content = content;
    this.sender = sender;
    this.group = group;
  }

  getContent() {
    // Inhalt der Nachricht auslesen
    return this.content;
  }

  setContent(content) {
    // Inhalt setzen
    this.content = content;
  }

  getSender() {
    // Sender auslesen
    return this.sender;
  }

  setSender(sender) {
    // Sender setzen
    this.sender = sender;
  }

  getGroup() {
    // Gruppe auslesen
    return this.group;
  }
  
  setGroup(group) {
    // Gruppe setzen
    this.group = group;
  }

  static fromJSON(groupmessage) {
    // Objekt anhand einer JSON-Struktur erstellen
    let msg = Object.setPrototypeOf(groupmessage, GroupMessageBO.prototype);
    return msg;
  }
}