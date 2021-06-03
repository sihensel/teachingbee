import BusinessObject from './BusinessObject';

/**
 * Represents a person
 */
export default class MessageBO extends BusinessObject {

  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   * 
   * @param {String} content - the firstname of this CustomerBO.
   * @param {String} sender - the firstname of this CustomerBO.
   * @param {String} recipient - the firstname of this CustomerBO.
   */
  constructor(content, sender, recipient) {
    super();
    this.content = content;
    this.sender = sender;
    this.recipient = recipient;
  }

  getContent(content) {
    return this.content;
  }

  getSender(sender) {
    return this.sender;
  }

  getRecipient(recipient) {
    return this.recipient;
  }
  

  
  
  /** 
   * Returns an Object from a JSON
   */
  static fromJSON(message) {
    let msg = Object.setPrototypeOf(message, MessageBO.prototype);
    return msg;
  }
}