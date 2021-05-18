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
            profileID: ''
        };
        fetch('http://localhost:5000/person/', {
            method: 'get'
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id, fname: data.fname, lname: data.lname, birthdate: data.birthdate, semester: data.semester, gender: data.gender,
                course: data.course, studytype: data.studytype, extroverted: data.extroverted, frequency: data.frequency, online: data.online, profileID: data.profileID
            }));
    }

    render() {
        /* Reihenfolge des Dropdown-Menüs mit den Geschlechtern festlegen
        das Geschlecht aus der Datenbank soll immer als erstes angezeigt werden */
        const genderList = ['weiblich', 'männlich', 'divers'];  // vllt aus der Datenbank auslesen??

        // das Geschlecht aus der Datenbank aus der Liste entfernen
        for (let i = 0; i < genderList.length; i++) {
            if (genderList[i] === this.state.gender) {
                genderList.splice(i, 1);
                i--;   // es muss wieder ein Index zurückgegangen werden, da ein Element gelöscht wurde
            }
        }
        const courseList = ['WI', 'ID', 'IW', 'OM'];  // vllt aus der Datenbank auslesen??

        // den Studiengang aus der Datenbank aus der Liste entfernen
        for (let i = 0; i < courseList.length; i++) {
            if (courseList[i] === this.state.course) {
                courseList.splice(i, 1);
                i--;   // es muss wieder ein Index zurückgegangen werden, da ein Element gelöscht wurde
            }
        }

        const studytypeList = ['auditiv', 'kommunikativ', 'motorisch', 'visuell'];  // vllt aus der Datenbank auslesen??

        // das Lerntyp aus der Datenbank aus der Liste entfernen
        for (let i = 0; i < studytypeList.length; i++) {
            if (studytypeList[i] === this.state.studytype) {
                studytypeList.splice(i, 1);
                i--;   // es muss wieder ein Index zurückgegangen werden, da ein Element gelöscht wurde
            }
        }

        const onlineList = ['offline', 'online', 'beides'];  // vllt aus der Datenbank auslesen??

        // das Lerntyp aus der Datenbank aus der Liste entfernen
        for (let i = 0; i < onlineList.length; i++) {
            if (onlineList[i] === this.state.online) {
                onlineList.splice(i, 1);
                i--;   // es muss wieder ein Index zurückgegangen werden, da ein Element gelöscht wurde
            }
        }

        return (
            <div>
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
                        <option value={this.state.gender}>{this.state.gender}</option>
                        <option value={genderList[0]}>{genderList[0]}</option>
                        <option value={genderList[1]}>{genderList[1]}</option>
                    </select><br />
                    <label htmlFor="course">Studiengang:</label><br />
                    <select id="course" value={this.state.course} onChange={evt => this.updateCourse(evt)}>
                        <option value={this.state.course}>{this.state.course}</option>
                        <option value={courseList[0]}>{courseList[0]}</option>
                        <option value={courseList[1]}>{courseList[1]}</option>
                        <option value={courseList[2]}>{courseList[2]}</option>
                    </select><br />
                    <label htmlFor="studytype">Lerntyp:</label><br />
                    <select id="studytype" value={this.state.studytype} onChange={evt => this.updateStudytype(evt)}>
                        <option value={this.state.studytype}>{this.state.studytype}</option>
                        <option value={studytypeList[0]}>{studytypeList[0]}</option>
                        <option value={studytypeList[1]}>{studytypeList[1]}</option>
                        <option value={studytypeList[2]}>{studytypeList[2]}</option>
                    </select><br />
                    Extrovertiertheit: <br />
                    <input type="text" value={this.state.extroverted} onChange={evt => this.updateExtroverted(evt)}></input> <br />
                    Lernhäufigkeit: <br />
                    <input type="text" value={this.state.frequency} onChange={evt => this.updateFrequency(evt)}></input> <br />
                    Onlinelernen: <br />
                    <select id="online" value={this.state.online} onChange={evt => this.updateOnline(evt)}>
                        <option value={this.state.online}>{this.state.online}</option>
                        <option value={onlineList[0]}>{onlineList[0]}</option>
                        <option value={onlineList[1]}>{onlineList[1]}</option>
                    </select><br />
                </form>
                <button onClick={this.handleSubmit.bind(this)}>Absenden</button>
            </div>
        );
    }

    handleSubmit() {
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
                "profileID": this.state.profileID
            })
        })
    }

    updateFname(evt) {
        this.setState({
            fname: evt.target.value
        });
    }

    updateLname(evt) {
        this.setState({
            lname: evt.target.value
        });
    }

    updateBirthdate(evt) {
        this.setState({
            birthdate: evt.target.value
        });
    }

    updateSemester(evt) {
        this.setState({
            semester: evt.target.value
        });
    }

    updateGender(evt) {
        this.setState({
            gender: evt.target.value
        });
    }

    updateCourse(evt) {
        this.setState({
            course: evt.target.value
        });
    }

    updateStudytype(evt) {
        this.setState({
            studytype: evt.target.value
        });
    }

    updateExtroverted(evt) {
        this.setState({
            extroverted: evt.target.value
        });
    }

    updateFrequency(evt) {
        this.setState({
            frequency: evt.target.value
        });
    }

    updateOnline(evt) {
        this.setState({
            online: evt.target.value
        });
    }
};

export default ManagePerson;