import React from 'react';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            messages: [],
            recipientf: "",
            recipientl: "",
            content: ""
        };
    }

    render() {
        return (
            <div>
                <form>
                    fname:
                    <input value={this.state.fname} type="text" onChange={evt => this.updateFname(evt)}></input>
                    lname:
                    <input value={this.state.lname} type="text" onChange={evt => this.updateLname(evt)}></input><br/>
                </form>
                <button onClick={this.loadChat.bind(this)}>Anfragen</button><br/>

                Nachrichten:<br />
                <ul>
                    {
                       this.state.messages.map((entry) =>
                       <li>{entry["content"]}</li>
                       )
                    }

                </ul>

                Nachricht Verfassen:<br/>
                <form>
                    Empfänger:<br/>
                    fname:<input value={this.state.recipientf} type="text" onChange={evt => this.updateRecipientf(evt)}></input>
                    lname<input value={this.state.recipientl} type="text" onChange={evt => this.updateRecipientl(evt)}></input><br/>
                    Nachricht:<br/>
                    <input value={this.state.content} type="text" onChange={evt => this.updateContent(evt)}></input><br/>
                </form>
                <button onClick={this.sendMessage.bind(this)}>Absenden</button>
            </div>


        );
    }


    sendMessage(){
        fetch('http://127.0.0.1:5000/chat', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "senderf": this.state.fname,
                "senderl": this.state.lname,
                "recipientf": this.state.recipientf,
                "recipientl": this.state.recipientl,
                "content": this.state.content,
            })
        })
    }

    loadChat() {

        fetch('http://127.0.0.1:5000/chat?fname=' + this.state.fname + "&lname=" + this.state.lname, {
            method: 'get',
            headers: { 'content-type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => 
                this.setState({messages: data})
            );        
        //Hier kommen keine Daten an. Der State bleibt leer
    }


    updateRecipientf(evt) {
        this.setState({
            recipientf: evt.target.value
        });
    }    

    updateRecipientl(evt) {
        this.setState({
            recipientl: evt.target.value
        });
    }    
    
    updateContent(evt) {
        this.setState({
            content: evt.target.value
        });
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

};

export default Chat;