import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { TeachingbeeAPI } from '../api';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';




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
    
//Fertig machen
    addMessage = () => {
        let newMessage = new MessageBO(this.state.)
        TeachingbeeAPI.getAPI().addPerson(newPerson).then(person => {
          // Backend call sucessfull
          // reinit the dialogs state for a new empty customer
          this.setState(this.initialState);
          this.props.onClose(person); // call the parent with the object from backend
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



    render() {
        const { classes } = this.props
        const { messages, sender, recipient } = this.state
        console.log(messages)
        if (messages) {
            messages.sort((a, b) => {
                return a.getID() - b.getID();

            });
        }

        return (
            <div>
                {messages ?
                    messages.map(message => {
                        {if (message.getSender() != sender.getID()) {
                            return (
                                    <Grid
                                        item
                                        xs
                                        className={classes.outerColumn}
                                        style={{ display: "flex", alignItems: "center" }}>
                                        <Typography>{message.getContent()}</Typography>
                                    </Grid>
                                );
                            }
                            else {
                                return (
                                    <Grid
                                        item
                                        className={classes.outerColumn}
                                        container
                                        direction="row"
                                        alignItems="center"
                                        justify="flex-end">
                                        <Typography>{message.getContent()}</Typography>
                                    </Grid>
                                );
                            }
                        }
                })
                : null}

                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Standard" /> 
                    </form>
                    <Button color='primary' variant='contained' onClick={this.handleClose}>
                    Absenden
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
        borderRight: "1px solid grey",
        borderBottom: "1px solid grey",
        borderLeft: "1px solid grey",
        height: 100
    },
    centerColumn: {
        borderBottom: "1px solid grey",
        height: 100
    },
});




Chat.propTypes = {
    classes: PropTypes.object.isRequired,
    sender: PropTypes.object.isRequired,
    recipient: PropTypes.object.isRequired,
}

export default withStyles(styles)(Chat);