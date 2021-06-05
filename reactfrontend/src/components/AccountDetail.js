import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { TeachingbeeAPI } from '../api';
import PersonForm from './dialogs/PersonForm';
import ProfileForm from './dialogs/ProfileForm';
import DeleteDialog from './dialogs/DeleteDialog';
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';

class AccountDetail extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            interests: props.interests,
            person: props.person,
            profile: null,
            loadingInProgress: false,
            loadingError: null,
            showPerson: false,
            showProfile: false,
            showDelete: false
        };
    }
    componentDidMount() {
        this.getProfile();
    }

    getProfile = () => {
        TeachingbeeAPI.getAPI().getProfile(this.state.person.getProfileID()).then(profile =>
            this.setState({
                profile: profile,
                loadingInProgress: false,
                loadingError: null
            })).catch(e =>
                this.setState({
                    profile: null,
                    loadingInProgress: false,
                    loadingError: e
                })
            );
        this.setState({
            loadingInProgress: true,
            loadingError: null
        });
    }

    // handle PersonDialog
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
                profile: profile,     // update ProfileBO
                showProfile: false
            });
        } else {
            this.setState({ showProfile: false });
        }
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete})
    }

    handleClose = () => {
        this.props.onClose()
    }

    /** Renders the component */
    render() {
        const { classes, interests } = this.props;
        const { person, profile, loadingInProgress, loadingError, showPerson, showProfile, showDelete } = this.state

        return (
            <div>
                <Paper variant='outlined'>
                    <Typography variant='h6'>
                        Personendaten
               </Typography>
                    {person ?
                        <div>
                            <Typography>
                                Vorname: {person.getFname()}<br />
                            Nachname: {person.getLname()} <br />
                            Geburtsdatum: {person.getBirthdate()} <br />
                            Semester: {person.getSemester()} <br />
                            Geschlecht: {person.getGender()} <br />
                            Profil-ID: {person.getProfileID()} <br />
                            </Typography>
                            <br />
                            <Button variant='contained' color='primary' onClick={this.showPersonDialog}>
                                Bearbeiten
                            </Button></div>
                        : <div>
                            <p>Keine Personendaten verfügbar</p><Button variant='contained' color='primary' onClick={this.showPersonDialog}>
                                Anlegen
                </Button></div>}
                </Paper>

                <Paper variant='outlined' className={classes.root}>
                    <Typography variant='h6'>
                        Lernprofil
               </Typography>
                    {profile ?
                        <Typography>
                            Studiengang: {profile.getCourse()}<br />
                            Lerntyp: {profile.getStudytype()} <br />
                            Extrovertiertheit: {profile.getExtroverted()} <br />
                            Lernhäufigkeit: {profile.getFrequency()} mal die Woche <br />
                            Online: {profile.getOnline()} <br />
                            Interesse: {interests[profile.getInterest()-1][1]}
                        </Typography>
                        : null}
                    <br />
                    <Button variant='contained' color='primary' onClick={this.showProfileDialog}>
                        Bearbeiten
                </Button>
                </Paper>
                { profile ?
                    <ProfileForm show={showProfile} onClose={this.closeProfileDialog} profile={profile} interests={interests} />
                    : null }
                <br />
                <Button variant='contained' color='secondary' onClick={this.toggleDelete}>
                    Account löschen
                </Button>
                <Button color='secondary' onClick={this.handleClose}>
                    Zurück
                </Button>
                <PersonForm show={showPerson} onClose={this.closePersonDialog} person={person} />
                <DeleteDialog show={showDelete} onClose={this.toggleDelete} person={person} />
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

AccountDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    person: PropTypes.object.isRequired,
    interests: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(AccountDetail);