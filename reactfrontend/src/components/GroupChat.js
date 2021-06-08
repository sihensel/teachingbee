import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { TeachingbeeAPI, GroupMessageBO } from '../api';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class GroupChat extends Component {

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
        let newMessage = new GroupMessageBO(this.state.content, this.props.person.getID(), this.props.group.getID())
        TeachingbeeAPI.getAPI().addGroupMessage(newMessage).then(message => {
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
        TeachingbeeAPI.getAPI().getGroupMessage(this.props.group.getID()).then(messages =>
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
        const { classes, person, group } = this.props
        const { messages, content } = this.state

        if (messages) {
            messages.sort((a, b) => {
                return a.getID() - b.getID();

            });
        }

        return (
            <div>
                <h2>{group.getName()}</h2>
                {messages ?
                    messages.map(message => {
                        {
                            if (message.getSender() != person.getID()) {
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

GroupChat.propTypes = {
    classes: PropTypes.object.isRequired,
    person: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
}

export default withStyles(styles)(GroupChat);

