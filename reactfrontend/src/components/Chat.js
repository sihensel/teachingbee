import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Button } from '@material-ui/core';
import { TeachingbeeAPI } from '../api';


class Chat extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            messages: null,
            sender: props.sender,
            recipient: 2,
        };
    }

    componentDidMount() {
        this.getMessage();
    }

    getMessage = () => {
        TeachingbeeAPI.getAPI().getMessage(this.state.sender.getID(), this.state.recipient).then(messages =>
            this.setState({
                messages: messages,
                loadingInProgress: false,
                loadingError: null
            })).catch(e =>
                this.setState({
                    messages: null,
                    loadingInProgress: false,
                    loadingError: e
                })
            );
        this.setState({
            loadingInProgress: true,
            loadingError: null
        });
    }


    render() {
        const { messages, sender, recipient } = this.state
        console.log(messages)
        if (messages) {
            messages.sort((a, b) => {
                return a.getID() - b.getID();

            });
        }
        console.log(messages)
        return (
            /* <div>
                 {
                     messages ?
                     
                     messages.map(item => {
                        
                         if (item.getID()==sender.getID()){
                              <p align="right">{item.getContent()}</p>}
 
                         else {
                              <p>{item.getContent()}</p>
                         }
                     })
                     : null
                 }
             </div>*/
            <div className="d-flex flex-column flex-grow-1">
                <div className="flex-grow-1 overflow-auto">
                    <div className="d-flex flex-column align-items-start justify-content-end px-3">
                        {messages ?
                        messages.map(message => {
                            console.log(message.getID())
                            
                            return (
                                <div
                               
                                    key={message.getID()}
                                    className={`my-1 d-flex flex-column ${message.getSender() == sender.getID() ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                                    <div
                                        className={`rounded px-2 py-1 ${message.getSender() == sender.getID() ? 'bg-primary text-white' : 'border'}`}>
                                        {message.getContent()}
                                    </div>
                                    <div className={`text-muted small ${message.getSender() == sender.getID() ? 'text-right' : ''}`}>
                                        {message.getSender() == sender.getID() ? 'You' : recipient}
                                    </div>
                                </div>
                            )
                        })
                    :null}
                    </div>
                </div>
            </div>
        );

    }
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired,
    sender: PropTypes.object.isRequired,
    recipient: PropTypes.object.isRequired,
}

export default Chat;