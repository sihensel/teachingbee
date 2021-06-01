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
    constructor(members, admin, recieved_requests, chat, gname, profileID) {
        super();
        this.members = members;
        this.admin = admin;
        this.recieved_requests = recieved_requests;
        this.chat = chat;
        this.gname = gname;
        this.profileID = profileID;
    }

    setMembers(members) {
        this.members = members;
    }

    getMembers() {
        return this.members;
    }

    setAdmin(admin) {
        this.admin = admin;
    }

    getAdmin() {
        return this.admin;
    }

    setRecievedRequests(recieved_requests) {
        this.recieved_requests = recieved_requests;
    }

    getRecievedRequests() {
        return this.recieved_requests;
    }

    setChat(chat) {
        this.chat = chat;
    }

    getChat() {
        return this.chat;
    }

    setGname(gname) {
        this.gname = gname;
    }

    getGname() {
        return this.gname;
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