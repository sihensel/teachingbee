import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Button } from "@material-ui/core";
import { TeachingbeeAPI, GroupMessageBO } from "../api";
import GroupForm from './dialogs/GroupForm';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class GroupChat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            group: props.group,
            messages: null,
            content: "",
            showGroupForm: false
        };
    }

    componentDidMount() {
        this.getMessage();
    }

    // Nachricht hinzufügen
    addMessage = () => {
        let newMessage = new GroupMessageBO(this.state.content, this.props.person.getID(), this.state.group.getID())
        TeachingbeeAPI.getAPI().addGroupMessage(newMessage).then(message => {
            this.state.messages.push(message)
            this.setState({ content: '' });
        })
    }

    getMessage = () => {
        TeachingbeeAPI.getAPI().getGroupMessage(this.state.group.getID()).then(messages =>
            this.setState({
                messages: messages,
            })).catch(e =>
                this.setState({
                    messages: null,
                })
            );
    }

    // Gruppe verlassen
    leaveGroup = () => {
        TeachingbeeAPI.getAPI().leaveGroup(this.state.group, this.props.person).then(response =>
            this.handleClose()
        )
    }

    // GroupForm anzeigen
    showGroupForm = () => {
        this.setState({
            showGroupForm: true
        })
    }

    // GroupForm schließen
    closeGroupForm = group => {
        if (group) {
            this.setState({
                group: group,     // update ProfileBO
                showGroupForm: false
            });
        } else {
            this.setState({ showGroupForm: false });
        }
    }

    // Inhalt desn Textfelds ändern
    handleChange = (e) => {
        this.setState({ content: e.target.value })
    }

    // Componente schließen
    handleClose = () => {
        this.props.onClose()
    }

    render() {
        const { classes, person } = this.props
        const { group, messages, content, showGroupForm } = this.state

        if (messages) {
            messages.sort((a, b) => {
                return a.getID() - b.getID();

            });
        }

        return (
            <div>
                <h2>{group.getName()}</h2>
                <Button color='primary' variant='contained' onClick={this.showGroupForm}>
                    Bearbeiten
                </Button>
                <Button style={{marginLeft: 10}} color='secondary' variant='contained' onClick={this.leaveGroup}>
                    Gruppe verlassen
                </Button>
                {showGroupForm ?
                    <GroupForm group={group} show={showGroupForm} onClose={this.closeGroupForm} />
                    : null}
                {messages
                    ? messages.map(message => {
                        {
                            if (message.getSender() != person.getID()) {
                                return (
                                    <div id="recipient_text">
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
                                    <div id="sender_text">
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
                <Button className={classes.button_style} color='secondary' variant='outlined' onClick={this.handleClose}>
                    <ArrowBackIcon />
                </Button>
                <Button color='primary' variant='contained' onClick={this.addMessage}>
                    Absenden
                </Button>
            </div>
        );
    }
}

const styles = (theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "100ch",
        },
    },

    outerColumn: {
        margin: 5,
        padding: 5,
        height: 50,
    },
    button_style: {
        margin: 5,
        padding: 5,
    },
});

GroupChat.propTypes = {
    classes: PropTypes.object.isRequired,
    person: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupChat);