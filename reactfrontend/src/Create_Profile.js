import React, { Component } from "react";
class Create_Profile extends React.Component {
  constructor(props) {
    super(props);
    var testo = [];
    fetch("http://localhost:5000/create_profile", {
      method: "get",
    })
      .then((response) => response.json())
      .then(function (data) {
        testo = data;
      });
    this.state = {
      frequency: "",
      online: "",
      course: "",
      semester: "",
      interests: testo,
      studytype: "",
      extroverted: "",
    };
    console.log(this.state.interests);
  }

  //get methode reinmachen für interest mapper hier, vor render()

  render() {
    return (
      <div>
        <h1>Profil erstellen</h1>

        <form>
          <label htmlFor="frequency">Lernfrequenz:</label>
          <br />
          <select
            id="frequency"
            value={this.state.frequency}
            onChange={(evt) => this.updateFrequency(evt)}
          >
            <option value="1">1 mal die Woche</option>
            <option value="2">2-3 mal die Woche</option>
            <option value="3">4 mal oder mehr</option>
            {/* Likert Skala oder so coole Bausteine zum durchklicken */}
          </select>
          <br />
          <label htmlFor="online">Online oder Offline lernen?:</label>
          <br />
          <select
            id="online"
            value={this.state.online}
            onChange={(evt) => this.updateOnline(evt)}
          >
            <option value="1">online</option>
            <option value="2">offline</option>
            <option value="3">egal</option>
          </select>
          <br />
          <label htmlFor="course">Studiengang:</label>
          <br />
          <select
            id="course"
            value={this.state.course}
            onChange={(evt) => this.updateCourse(evt)}
          >
            <option value="WI">Wirtschaftsinformatik</option>
            <option value="OMM">Online Medien Management</option>
            <option value="ID">Informationsdesign</option>
            <option value="IW">Informationswissenschaften</option>
          </select>
          <br />v<label htmlFor="interests">Interessen:</label>
          <br />
          <select
            id="interests"
            value={this.state.interests}
            onChange={(evt) => this.updateInterests(evt)}
          >
            {/*<option value ="1">Sport</option>
                            <option value ="2">Technik</option>
                            <option value ="3">Natur</option>
                            <option value ="4">Sprachen</option>
                            <option value ="5">Kultur</option>
                            <option value ="6">Musik</option>
                            <option value ="7">Reisen</option>
                            <option value ="8">Gaming</option>
                            <option value ="9">Kreativität</option>
                             */}

            {this.state.interests.map((interest) => {
              return <option> {interest}</option>;
            })}
          </select>
          <br />
          <label htmlFor="studytype">Wie lernst du lieber?:</label>
          <br />
          <select
            id="studytype"
            value={this.state.studytype}
            onChange={(evt) => this.updateStudytype(evt)}
          >
            <option value="audio">Auditiv</option>
            <option value="visual">Visuell</option>
            <option value="communicate">Kommunikativ</option>
            <option value="motoric">Motorisch</option>
          </select>
          <br />
          <label htmlFor="extroverted">Wie extrovertiert bist du?:</label>
          <br />
          <select
            id="extroverted"
            value={this.state.frequency}
            onChange={(evt) => this.updateExtroverted(evt)}
          >
            <option value="ex1">sehr wenig</option>
            <option value="ex1">wenig</option>
            <option value="ex1">neutral</option>
            <option value="ex1">sehr</option>

            {/* Likert Skala */}
          </select>
          <br />
        </form>
        <button onClick={this.handleSubmit.bind(this)}>Profil erstellen</button>
      </div>
    );
  }

  handleSubmit() {
    // Simple POST request with a JSON body using fetch
    /*
      const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fname: this.state.fname.valueOf(),
                lname: this.state.lname.valueOf(),
                date: this.state.date,
                semester: this.state.semester.valueOf(),
                gender: this.state.gender.valueOf()
                })
         };
        fetch('https://localhost:5000/api', requestOptions)
            .then(response => response.json())
            //.then(data => this.setState({ postId: data.id }));
            //console.log(response.json())
            */

    fetch("http://127.0.0.1:5000/create_profile", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        frequency: this.state.frequency,
        online: this.state.online,
        course: this.state.course,
        interests: this.state.interests,
        studytype: this.state.studytype,
        extroverted: this.state.extroverted,
      }),
    });
  }

  updateFrequency(evt) {
    this.setState({
      frequency: evt.target.value,
    });
  }

  updateOnline(evt) {
    this.setState({
      online: evt.target.value,
    });
  }

  updateCourse(evt) {
    this.setState({
      course: evt.target.value,
    });
  }
  updateInterests(evt) {
    this.setState({
      interests: evt.target.value,
    });
  }
  updateStudytype(evt) {
    this.setState({
      studytype: evt.target.value,
    });
  }
  updateExtroverted(evt) {
    this.setState({
      extroverted: evt.target.value,
    });
  }
}

export default Create_Profile;
