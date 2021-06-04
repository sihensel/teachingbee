import BusinessObject from './BusinessObject';

/**
 * Represents a person
 */
export default class GroupBO extends BusinessObject {

    /**
     * Constructs a CustomerBO object with a given firstname and lastname.
     * 
     * @param {String} members - the members of this CustomerBO.
     * @param {String} lname - the firstname of this CustomerBO.
     * @param {String} birthdate - the firstname of this CustomerBO.
     * @param {String} semester - the firstname of this CustomerBO.
     * @param {String} gender - the firstname of this CustomerBO.
     * @param {String} profileID - the firstname of this CustomerBO.
     */
    constructor(profileID) {
        super();
        this.profileID = profileID;
    }


    setProfileID(profileID) {
        this.profileID = profileID;
    }

    getProfileID() {
        return this.profileID;
    }


    /** 
     * Returns an Object from a JSON
     */
    static fromJSON(group) {
        let p = Object.setPrototypeOf(group, GroupBO.prototype);
        return p;
    }
}