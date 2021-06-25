import BusinessObject from './BusinessObject';

export default class MessageBO extends BusinessObject {

  constructor(content, sender, recipient) {
    super();
    this.content = content;
    this.sender = sender;
    this.recipient = recipient;
  }

  getContent() {
    // Inhalt auslesen
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

  getRecipient() {
    // Empfänger auslesen
    return this.recipient;
  }

  setRecipipient(recipient) {
    // Empfänger setzen
    this.recipient = recipient;
  }
  
  static fromJSON(message) {
    // Objekt anhand einer JSON-Struktur erstellen
    let msg = Object.setPrototypeOf(message, MessageBO.prototype);
    return msg;
  }
}