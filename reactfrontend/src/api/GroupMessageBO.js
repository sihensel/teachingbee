import BusinessObject from './BusinessObject';

/**
 * Represents a groupmessage
 */
export default class GroupMessageBO extends BusinessObject {

  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   * 
   * @param {String} content - the firstname of this CustomerBO.
   * @param {String} sender - the firstname of this CustomerBO.
   * @param {String} group - the firstname of this CustomerBO.
   */
  constructor(content, sender, group) {
    super();
    this.content = content;
    this.sender = sender;
    this.group = group;
  }

  getContent(content) {
    return this.content;
  }

  getSender(sender) {
    return this.sender;
  }

  getGroup(recipient) {
    return this.group;
  }

  /** 
   * Returns an Object from a JSON
   */
  static fromJSON(groupmessage) {
    let msg = Object.setPrototypeOf(groupmessage, GroupMessageBO.prototype);
    return msg;
  }
}