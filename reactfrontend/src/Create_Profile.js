import React from "react";
import Select from 'react-select';

class Create_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: "",
      online: "",
      course: "",
      interests: [],          // Interessen aus der Datenbank
      selectedinterest: '',  // in React selektierte Interessen
      studytype: "",
      extroverted: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/create_profile", {
      method: "get",
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ interests: json })
      });
  }


  render() {
    const selectoptions = this.state.interests.map(item => ({
      "value": item[0],
      "label": item[1]
    }))
    return (
      <div>
        <h1>Profil erstellen</h1>

        <form>
          <label htmlFor="frequency">Lernfrequenz:</label>
          <br />
          <select id="frequency" value={this.state.frequency} onChange={(evt) => this.updateFrequency(evt)}>
            <option value=""></option>
            <option value="1">1 mal die Woche</option>
            <option value="2">2 mal die Woche</option>
            <option value="3">3 mal oder mehr</option>
          </select>
          <br />
          <label htmlFor="online">Online oder Offline lernen?:</label>
          <br />
          <select id="online" value={this.state.online} onChange={(evt) => this.updateOnline(evt)}>
            <option value=""></option>
            <option value="online">online</option>
            <option value="offline">offline</option>
            <option value="beides">beides</option>
          </select>
          <br />
          <label htmlFor="course">Studiengang:</label>
          <br />
          <select id="course" value={this.state.course} onChange={(evt) => this.updateCourse(evt)}>
            <option value=""></option>
            <option value="WI">Wirtschaftsinformatik</option>
            <option value="OM">Online Medien Management</option>
            <option value="ID">Informationsdesign</option>
            <option value="IW">Informationswissenschaften</option>
          </select>
          <br />
          <label htmlFor="interests">Interessen/Hobbies:</label>
          <br />
          <select id="interests" value={this.state.selectedinterest} onChange={(evt) => this.updateInterest(evt)}>
            <option value=""></option>
            {this.state.interests.map(item => (
              <option value={item[0]}>{item[1]}</option>
            ))}
          </select>
          {/*<Select options={selectoptions} isMulti onChange={this.updateInterests.bind(this)} />*/}
          <br />
          <label htmlFor="studytype">Wie lernst du lieber?:</label>
          <br />
          <select id="studytype" value={this.state.studytype} onChange={(evt) => this.updateStudytype(evt)}>
            <option value=""></option>
            <option value="auditiv">Auditiv</option>
            <option value="kommunikativ">Kommunikativ</option>
            <option value="motorisch">Motorisch</option>
            <option value="visuell">Visuell</option>
          </select>
          <br />
          <label htmlFor="extroverted">Wie extrovertiert bist du?:</label>
          <br />
          <select id="extroverted" value={this.state.extroverted} onChange={(evt) => this.updateExtroverted(evt)}>
            <option value=""></option>
            <option value="1">wenig</option>
            <option value="2">mäßig</option>
            <option value="3">sehr</option>
          </select>
          <br />
        </form>
        <button onClick={this.handleSubmit.bind(this)}>Profil erstellen</button>
      </div>
    );
  }

  handleSubmit() {
    fetch("http://127.0.0.1:5000/create_profile", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        frequency: this.state.frequency,
        online: this.state.online,
        course: this.state.course,
        studytype: this.state.studytype,
        extroverted: this.state.extroverted,
        interest: this.state.selectedinterest,
      }),
    });
  }

  updateFrequency(evt) {
    this.setState({ frequency: evt.target.value });
  }

  updateOnline(evt) {

    this.setState({ online: evt.target.value });
  }

  updateCourse(evt) {
    this.setState({ course: evt.target.value });
  }

  updateInterest(evt) {
    this.setState({ selectedinterest: evt.target.value })
  }

  updateStudytype(evt) {
    this.setState({ studytype: evt.target.value });
  }

  updateExtroverted(evt) {
    this.setState({ extroverted: evt.target.value });
  }
}

export default Create_Profile;