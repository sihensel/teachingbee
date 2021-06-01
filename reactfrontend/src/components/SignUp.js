import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Button } from '@material-ui/core';
import { TeachingbeeAPI } from '../api';
import PersonForm from './dialogs/PersonForm';
import ProfileForm from './dialogs/ProfileForm';
import AccountDetail from './AccountDetail';

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
            linked: false,
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
        if (!this.state.linked) {
            TeachingbeeAPI.getAPI().link_person_profile(this.state.person.getID(), this.state.profile.getID()).then(response => {
                if (response == 'successfull') {
                    // dem PersonBO noch die ProfileID zuweisen
                    this.state.person.setProfileID(this.state.profile.getID())
                    this.setState({ linked: true });
                }
            })
        }
    }

    render() {
        const { interests } = this.props;
        const { person, profile, showPerson, showProfile, linked } = this.state;
        console.log(this.state)
        return (
            <div>
                { linked ?
                    <AccountDetail person={person} profile={profile} interests={interests} />
                    :
                    <div>
                        <Paper variant='outlined'>
                            <Typography variant='h6'>
                                Personendaten
                            </Typography>
                            {!person ?
                                <div><p>Keine Personendaten verfügbar</p>
                                    <Button variant='contained' color='primary' onClick={this.showPersonDialog}>
                                        Anlegen
                        </Button></div>
                                : <p>Personendaten erfolgreich gespeichert. (ID: {person.getID()})</p>}
                        </Paper>
                        <Paper variant='outlined'>
                            <Typography variant='h6'>
                                Lernprofil
                            </Typography>
                            {person ?
                                !profile ?
                                    <div><p>Kein Lernprofil verfügbar</p>
                                        <Button variant='contained' color='primary' onClick={this.showProfileDialog}>
                                            Anlegen
                        </Button></div>
                                    : <div><p>Lernprofil erfolgreich gespeichert. (ID: {profile.getID()})</p></div> : null}
                        </Paper>
                        {person && profile ?
                            this.link()
                            : null}
                        <PersonForm show={showPerson} person={person} onClose={this.closePersonDialog} />
                        <ProfileForm show={showProfile} profile={profile} interests={interests} onClose={this.closeProfileDialog} />
                    </div>}
            </div>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    interests: PropTypes.array.isRequired,
}

export default SignUp;