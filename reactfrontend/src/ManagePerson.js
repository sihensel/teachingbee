import React from 'react';

class ManagePerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            fname: '',
            lname: '',
            birthdate: '',
            semester: '',
            gender: '',
            course: '',
            studytype: '',
            extroverted: '',
            frequency: '',
            online: '',
            profileID: '',
            interests: [],          // Interessen aus der Datenbank
            selectedinterest: ''  // in React selektierte Interesse
        };
    }

    componentDidMount() {
        // Profildaten
        fetch('http://localhost:5000/person/', {
            method: 'get'
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id, fname: data.fname, lname: data.lname, birthdate: data.birthdate, semester: data.semester, gender: data.gender,
                course: data.course, studytype: data.studytype, extroverted: data.extroverted, frequency: data.frequency, online: data.online, profileID: data.profileID, selectedinterest: data.interest
            }));
        // Interessen aus der Datenbank
        fetch("http://localhost:5000/create_profile", {
            method: "get",
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ interests: json })
            });
    }

    render() {
        return (
            < div >
                <h1>Profil bearbeiten</h1>
                <form>
                    Vorname: <br />
                    <input type="text" value={this.state.fname} onChange={evt => this.updateFname(evt)}></input> <br />
                    Nachname: <br />
                    <input type="text" value={this.state.lname} onChange={evt => this.updateLname(evt)}></input><br />
                    Geburtsdatum:<br />
                    <input type="date" value={this.state.birthdate} onChange={evt => this.updateBirthdate(evt)}></input><br />
                    Semester: <br />
                    <input type="text" value={this.state.semester} onChange={evt => this.updateSemester(evt)}></input><br />
                    <label htmlFor="gender">Geschlecht:</label><br />
                    <select id="gender" value={this.state.gender} onChange={evt => this.updateGender(evt)}>
                        <option value="weiblich">weiblich</option>
                        <option value="männlich">männlich</option>
                        <option value="divers">divers</option>
                    </select><br />
                    <label htmlFor="course">Studiengang:</label><br />
                    <select id="course" value={this.state.course} onChange={evt => this.updateCourse(evt)}>
                        <option value="WI">Wirtschaftsinformatik</option>
                        <option value="OM">Onlinemedienmanagement</option>
                        <option value="ID">Informationsdesign</option>
                        <option value="IW">Informationswissenschaften</option>
                    </select><br />
                    <label htmlFor="studytype" value={this.state.studytype}>Lerntyp:</label><br />
                    <select id="studytype" value={this.state.studytype} onChange={evt => this.updateStudytype(evt)}>
                        <option value="auditiv">Auditiv</option>
                        <option value="kommunikativ">Kommunikativ</option>
                        <option value="motorisch">Motorisch</option>
                        <option value="visuell">Visuell</option>
                    </select><br />
                    <label htmlFor="extroverted">Wie extrovertiert bist du?:</label>
                    <br />
                    <select id="extroverted" value={this.state.extroverted} onChange={(evt) => this.updateExtroverted(evt)}>
                        <option value="1">wenig</option>
                        <option value="2">mäßig</option>
                        <option value="3">sehr</option>
                    </select>< br />
                    <label htmlFor="frequency">Lernfrequenz:</label>
                    <br />
                    <select id="frequency" value={this.state.frequency} onChange={(evt) => this.updateFrequency(evt)}>
                        <option value="1">1 mal die Woche</option>
                        <option value="2">2 mal die Woche</option>
                        <option value="3">3 mal oder mehr</option>
                    </select><br />
                    Onlinelernen: <br />
                    <select id="online" value={this.state.online} onChange={evt => this.updateOnline(evt)}>
                        <option value="online">online</option>
                        <option value="offline">offline</option>
                        <option value="beides">beides</option>
                    </select><br />
                    <label htmlFor="interest">Interessen/Hobbies:</label>
                    <br />
                    <select id="interest" value={this.state.selectedinterest} onChange={(evt) => this.updateInterest(evt)}>
                        {this.state.interests.map(item => (
                            <option value={item[1]}>{item[1]}</option>
                        ))}
                    </select>
                    <br />
                </form>
                <button onClick={this.handleSubmit.bind(this)}>Absenden</button>
            </div>
        );
    }

    handleSubmit() {
        // noch auf leere Felder checken!
        fetch('http://127.0.0.1:5000/person/', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "id": this.state.id,
                "fname": this.state.fname,
                "lname": this.state.lname,
                "birthdate": this.state.birthdate,
                "semester": this.state.semester,
                "gender": this.state.gender,
                "course": this.state.course,
                "studytype": this.state.studytype,
                "extroverted": this.state.extroverted,
                "frequency": this.state.frequency,
                "online": this.state.online,
                "profileID": this.state.profileID,
                "interest": this.state.selectedinterest
            })
        })
    }

    updateFname(evt) {
        this.setState({ fname: evt.target.value });
    }

    updateLname(evt) {
        this.setState({ lname: evt.target.value });
    }

    updateBirthdate(evt) {
        this.setState({ birthdate: evt.target.value });
    }

    updateSemester(evt) {
        this.setState({ semester: evt.target.value });
    }

    updateGender(evt) {
        this.setState({ gender: evt.target.value });
    }

    updateCourse(evt) {
        this.setState({ course: evt.target.value });
    }

    updateStudytype(evt) {
        this.setState({ studytype: evt.target.value });
    }

    updateExtroverted(evt) {
        this.setState({ extroverted: evt.target.value });
    }

    updateFrequency(evt) {
        this.setState({ frequency: evt.target.value });
    }

    updateOnline(evt) {
        this.setState({ online: evt.target.value });
    }
    updateInterest(evt) {
        this.setState({ selectedinterest: evt.target.value })
    }
};

export default ManagePerson;