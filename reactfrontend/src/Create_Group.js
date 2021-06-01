import React from 'react';

class CreateGroup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        members: [],
        adminfname: "",
        adminlname: "",
        memberfname: "",
        memberlname: "",
        gname: ""
      };
    }
  
    render() {
        return (
            <div>
                <h1>Create Group</h1>
                <form>
                    Gruppenname: <br/>
                    <input type="text" value={this.state.gname} onChange={evt => this.update_gname(evt)}></input> <br/>
                    Admin setzen: <br/>
                    <input type="text" value={this.state.adminfname} onChange={evt => this.update_adminfname(evt)}></input><br/>
                    <input type="text" value={this.state.adminlname} onChange={evt => this.update_adminlname(evt)}></input><br/>
                    Mitglied hinzufügen: <br/>
                    <input type="text" value={this.state.memberfname} onChange={evt => this.update_memberfname(evt)}></input><br/>
                    <input type="text" value={this.state.memberlname} onChange={evt => this.update_memberlname(evt)}></input><br/>
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
                "gname": this.state.gname,
                "members": this.state.members,
                "adminfname": this.state.adminfname,
                "adminlname": this.state.adminlname
                })
            })
        }
        
    

    update_gname(evt) {
        this.setState({
          gname: evt.target.value
        });
      }

    update_adminfname(evt) {
      this.setState({
          adminfname: evt.target.value
      });
      }

    update_adminlname(evt) {
      this.setState({
          adminlname: evt.target.value
      });
      }

    update_memberfname(evt) {
        this.setState({
            memberfname: evt.target.value
        });
        }

    update_memberlname(evt) {
      this.setState({
          memberlname: evt.target.value
      });
      }
  

    add_member(evt) {
      
      var memberlist = this.state.members.concat([this.state.memberlname + ", " + this.state.memberfname])

        this.setState({
          members: memberlist,
          memberfname: "",
          memberlname: ""
        })
        }

  };

export default CreateGroup;