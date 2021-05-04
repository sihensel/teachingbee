import React from 'react';

class UserSignup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fname: '',
        lname: '',
        birthdate: '',
        semester: '',
        gender: ''
      };
    }
  
    render() {
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
                            <option value="f">Weiblich</option>
                            <option value="m">Männlich</option>
                            <option value="d">Diverse</option>
                        </select><br/>
                </form>
                <button onClick={this.handleSubmit.bind(this)}>Absenden</button>
            </div>
      );
    }
  
    handleSubmit(){
      // Simple POST request with a JSON body using fetch
      console.log("test");
      const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fname: this.state.fname,
                lname: this.state.lname,
                date: this.state.date,
                semester: this.state.semester,
                gender: this.state.gender
                })
         };
        fetch('https://localhost:5000/api', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
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

export default UserSignup;