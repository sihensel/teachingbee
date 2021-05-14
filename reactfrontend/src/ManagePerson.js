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
        gender: ''
      };
        fetch('http://localhost:5000/person/', {
            method: 'get'})
            .then(response => response.json())
            .then(data => this.setState({ id: data.id, fname: data.fname, lname: data.lname, birthdate: data.birthdate, semester: data.semester, gender: data.gender}));
    }

    render() {
        /* Reihenfolge des Dropdown-Menüs mit den Geschlechtern festlegen
        das Geschlecht aus der Datenbank soll immer als erstes angezeigt werden */
        const genderList = ['weiblich', 'männlich', 'divers'];  // vllt aus der Datenbank auslesen??

        // das Geschlecht aus der Datenbank aus der Liste entfernen
        for (let i=0; i<genderList.length; i++) {
            if (genderList[i] === this.state.gender) {
                genderList.splice(i, 1);
                i --;   // es muss wieder ein Index zurückgegangen werden, da ein Element gelöscht wurde
            }
        }

        return (
            <div>
                <h1>SignUp</h1>
                <form>
                    Vorname: <br/>
                    <input type="text" value={this.state.fname} onChange={evt => this.updateFname(evt)}></input> <br/>
                    Nachname: <br/>
                    <input type="text" value={this.state.lname} onChange={evt => this.updateLname(evt)}></input><br/>
                    Geburtsdatum:<br/>
                    <input type="date" value={this.state.birthdate} onChange={evt => this.updateBirthdate(evt)}></input><br/>
                    Semester: <br/>
                    <input type="text" value={this.state.semester} onChange={evt => this.updateSemester(evt)}></input><br/>
                    <label htmlFor="gender">Geschlecht:</label><br/>
                        <select id="gender" value={this.state.gender} onChange={evt => this.updateGender(evt)}>
                            <option value={this.state.gender}>{this.state.gender}</option>
                            <option value={genderList[0]}>{genderList[0]}</option>
                            <option value={genderList[1]}>{genderList[1]}</option>
                        </select><br/>
                </form>
                <button onClick={this.handleSubmit.bind(this)}>Absenden</button>
            </div>
      );
    }
  
    handleSubmit(){
        fetch('http://127.0.0.1:5000/person/', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                "id": this.state.id,
                "fname": this.state.fname,
                "lname": this.state.lname,
                "birthdate": this.state.birthdate,
                "semester": this.state.semester,
                "gender": this.state.gender
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
  };

export default ManagePerson;