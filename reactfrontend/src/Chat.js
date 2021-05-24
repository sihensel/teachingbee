import React from 'react';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            messages: {}
            
        };
    }

    render() {
        return (
            <div>
                <form>
                    fname:
                    <input value={this.state.fname} type="text" onChange={evt => this.updateFname(evt)}></input>
                    lname:
                    <input value={this.state.lname} type="text" onChange={evt => this.updateLname(evt)}></input><br />
                </form>
                <button onClick={this.loadChat.bind(this)}>Absenden</button>

                Nachrichten:<br />
                <ul>
                    {
                       // Object.keys(this.state.messages).map(function (key, index) {
                         //   <li>this.state.messages[key]['content']</li>
                        //})

                        this.state.messages.map((message) => {
                            return <option value={message}> {messages}</option>;
                    })}

                </ul>


            </div>


        );
    }

    loadChat() {

        fetch('http://127.0.0.1:5000/chat?fname=' + this.state.fname + "&lname=" + this.state.lname, {
            method: 'get',
            headers: { 'content-type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) =>
                this.setState({ messages: data }),
                console.log(this.state.messages)
            );
        
        //Hier kommen keine Daten an. Der State bleibt leer
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