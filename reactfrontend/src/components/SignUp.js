import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Button, withStyles } from '@material-ui/core';
import { TeachingbeeAPI } from '../api';
import PersonForm from './dialogs/PersonForm';
import ProfileForm from './dialogs/ProfileForm';
import AccountDetail from './AccountDetail';
import App from '../App';

class SignUp extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            person: null,
            profile: null,
            interests: props.interests,
            showPerson: false,
            showProfile: false,
        };
    }
    showPersonDialog = () => {
        this.setState({ showPerson: true });
    }
    closePersonDialog = person => {
        if (person) {
            this.setState({
                person: person,     // update PersonBO
                showPerson: false
            });
        } else {
            this.setState({ showPerson: false });
        }
    }

    // handle ProfileDialog
    showProfileDialog = () => {
        this.setState({ showProfile: true });
    }
    closeProfileDialog = profile => {
        if (profile) {
            this.setState({
                profile: profile,     // update PersonBO
                showProfile: false
            });
        } else {
            this.setState({ showProfile: false });
        }
    }

    // die Person mit ihrem Profil 'verknüpfen'
    link = () => {
        TeachingbeeAPI.getAPI().link_person_profile(this.state.person.getID(), this.state.profile.getID()).then(response => {
            if (response == 'successfull') {
                // dem PersonBO noch die ProfileID zuweisen
                this.state.person.setProfileID(this.state.profile.getID())
                this.props.onClose(this.state.person)
            }
        })
    }

    render() {
        const { classes, interests } = this.props;
        const { person, profile, showPerson, showProfile } = this.state;
        return (
            <div>
                { <div>
                    <Paper variant='outlined' className={classes.root}>
                        <div className={classes.content}>
                            <Typography variant='h6'>
                                Personendaten
                            </Typography>
                            {!person
                                ? <div><p>Keine Personendaten verfügbar</p>
                                    <Button variant='contained' color='primary' onClick={this.showPersonDialog}>
                                        Anlegen
                                    </Button></div>
                                : <p>Personendaten erfolgreich gespeichert. (ID: {person.getID()})</p>}
                        </div>
                    </Paper>
                    <Paper variant='outlined' className={classes.root}>
                        <div className={classes.content}>
                            <Typography variant='h6'>
                                Lernprofil
                            </Typography>
                            {person
                                ? !profile
                                    ? <div><p>Kein Lernprofil verfügbar</p>
                                        <Button variant='contained' color='primary' onClick={this.showProfileDialog}>
                                            Anlegen
                                        </Button></div>
                                    : <div>
                                        <p>Lernprofil erfolgreich gespeichert. (ID: {profile.getID()})</p>
                                    </div>
                                : null}
                        </div>
                    </Paper>
                    {person && profile
                        ? this.link()
                        : null}
                    <PersonForm show={showPerson} person={person} onClose={this.closePersonDialog} />
                    <ProfileForm show={showProfile} profile={profile} interests={interests} onClose={this.closeProfileDialog} />
                </div>}
            </div>
        );
    }
}


const styles = (theme) => ({
    root: {
        width: '100%',
        //backgroundColor: theme.palette.background.paper,
        margin: 10,
    },
    content: {
        width: '100%',
        //backgroundColor: theme.palette.background.paper,
        margin: 10,
    },
});

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    interests: PropTypes.array.isRequired,
}

export default withStyles(styles)(SignUp);