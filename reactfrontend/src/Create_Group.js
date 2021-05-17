import React from 'react';

class CreateGroup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        members: [],
        member = "",
        name: ""
      };
    }
  
    render() {
        return (
            <div>
                <h1>Create Group</h1>
                <form>
                    Name <br/>
                    <input type="text" value={this.state.name} onChange={evt => this.update_name(evt)}></input> <br/>
                    Nachname: <br/>
                    <input type="text" value={this.state.member} onChange={evt => this.update_member(evt)}></input><br/>

                </form>
                <button onClick={this.add_member.bind(this)}>Member hinzufügen</button>
                <button onClick={this.handleSubmit.bind(this)}>Absenden</button>

                <p>Gruppenmitglieder: </p>
                <ul>{this.state.members.map(item => (<li key={item}>{item}</li>))}</ul>

            </div>
      );
    }
  
    handleSubmit(){
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

        fetch('http://127.0.0.1:5000/create-group', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                "name": this.state.name,
                "members": this.state.members
                })
            })
        }
        
    

    update_name(evt) {
        this.setState({
          name: evt.target.value
        });
      }

    update_member(evt) {
        this.setState({
            member: evt.target.value
        });
        }

    add_member(evt) {
        this.state.members.concat(evt.target.value)
        }

  };

export default CreateGroup;