import React from 'react';
import GroupBO from './api/GroupBO';
import TeachingbeeAPI from './api/TeachingbeeAPI';

class CreateGroup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        members: [],
        admin: props.person.getID(),
        memberfname: "",
        memberlname: "",
        gname: ""
      };
    }
  
    render() {
        return (
            <div>
                <h2>Gruppe anlegen</h2>
                <form>
                    Gruppenname: <br/>
                    <input type="text" value={this.state.gname} onChange={evt => this.update_gname(evt)}></input> <br/>
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
        var group=GroupBO()
        group.setGname(this.state.gname)
        group.setMembers(this.state.members)
        group.setAdmin(this.state.admin)
        TeachingbeeAPI.getAPI().addGroup(group)
    }


        /*fetch('http://127.0.0.1:5000/create-group', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                "gname": this.state.gname,
                "members": this.state.members,
                "adminfname": this.state.adminfname,
                "adminlname": this.state.adminlname
                })
           */
        
        
    

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