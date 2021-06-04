import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { TeachingbeeAPI, MessageBO } from '../api';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class Chat extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            messages: null,
            content: "",
        };
    }

    componentDidMount() {
        this.getMessage();
    }

    addMessage = () => {
        let newMessage = new MessageBO(this.state.content, this.props.sender.getID(), this.props.recipient.getID())
        TeachingbeeAPI.getAPI().addMessage(newMessage).then(message => {
            this.state.messages.push(message)
            this.setState({ content: '' });
            // Backend call sucessfull
            // reinit the dialogs state for a new empty customer
        }).catch(e =>
            this.setState({
                updatingInProgress: false,    // disable loading indicator 
                updatingError: e              // show error message
            })
        );

        // set loading to true
        this.setState({
            updatingInProgress: true,       // show loading indicator
            updatingError: null             // disable error message
        });
    }

    getMessage = () => {
        TeachingbeeAPI.getAPI().getMessage(this.props.sender.getID(), this.props.recipient.getID()).then(messages =>
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

    handleChange = (e) => {
        this.setState({ content: e.target.value })
    }

    handleClose = () => {
        this.props.onClose()
    }

    render() {
        const { classes, sender, recipient } = this.props
        const { messages, content } = this.state
        if (messages) {
            messages.sort((a, b) => {
                return a.getID() - b.getID();

            });
        }

        return (
            <div>
                <h2>{recipient.getFname() + ' ' + recipient.getLname()}</h2>
                {messages ?
                    messages.map(message => {
                        {
                            if (message.getSender() != sender.getID()) {
                                return (
                                    <div>
                                        <Grid
                                            item
                                            xs
                                            className={classes.outerColumn}
                                            style={{ display: "flex", alignItems: "center" }}>
                                            <Typography>{message.getContent()}</Typography>
                                        </Grid>
                                        <Divider />
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div>
                                        <Grid
                                            item
                                            className={classes.outerColumn}
                                            container
                                            direction="row"
                                            alignItems="center"
                                            justify="flex-end">
                                            <Typography>{message.getContent()}</Typography>
                                        </Grid>
                                        <Divider />
                                    </div>
                                );
                            }
                        }
                    })
                    : null}

                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Bitte Text eingeben" value={content} onChange={this.handleChange} />
                </form>
                <Button color='primary' variant='contained' onClick={this.addMessage}>
                    Absenden
                    </Button>
                <Button color='secondary' onClick={this.handleClose}>
                    Zurück
                    </Button>

            </div>
        );
    }
}

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100ch',
        },
    },

    outerColumn: {
        margin: 5,
        padding: 5,
        height: 50
    }
});

Chat.propTypes = {
    classes: PropTypes.object.isRequired,
    sender: PropTypes.object.isRequired,
    recipient: PropTypes.object.isRequired,
}

export default withStyles(styles)(Chat);