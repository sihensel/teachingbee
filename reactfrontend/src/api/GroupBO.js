import BusinessObject from './BusinessObject';

/**
 * Klasse für die Gruppenobjekte
 */
export default class GroupBO extends BusinessObject {

    constructor(info, profileID) {
        super();
        this.info = info;
        this.profileID = profileID;
    }

    setInfo(info){
        // Gruppeninfo auslesen
        this.info = info
    }

    getInfo(){
        // Gruppeninfo setzen
        return this.info
    }

    setProfileID(profileID) {
        // profileID setzen
        this.profileID = profileID;
    }

    getProfileID() {
        // profileID auslesen
        return this.profileID;
    }

    static fromJSON(group) {
        // Objekt anhand einer JSON-Struktur erstellen
        let p = Object.setPrototypeOf(group, GroupBO.prototype);
        return p;
    }
}