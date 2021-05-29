import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { TeachingbeeAPI } from '../api';
import PersonForm from './dialogs/PersonForm';
import ProfileForm from './dialogs/ProfileForm';
import DeleteDialog from './dialogs/DeleteDialog';
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';


/**
 * Shows a modal form dialog for a CustomerBO in prop customer. If the customer is set, the dialog is configured 
 * as an edit dialog and the text fields of the form are filled from the given CustomerBO object. 
 * If the customer is null, the dialog is configured as a new customer dialog and the textfields are empty.
 * In dependency of the edit/new state, the respective backend calls are made to update or create a customer.
 * After that, the function of the onClose prop is called with the created/update CustomerBO object as parameter.  
 * When the dialog is canceled, onClose is called with null.
 * 
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * @see See Material-UIs [TextField](https://material-ui.com/components/text-fields//)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class AccountDetail extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            person: props.person,
            profile: props.profile,
            interests: props.interests,
            loadingInProgress: false,
            loadingError: null,
            showPerson: false,
            showProfile: false,
            showDelete: false
        };
    }
    componentDidMount() {
        if (!this.state.profile) {
            this.getProfile();
        }
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

    getInterests = () => {
        TeachingbeeAPI.getAPI().getInterests().then(interests =>
            this.setState({
                interests: interests,
                loadingInProgress: false,
                loadingError: null
            })).catch(e =>
                this.setState({
                    interests: null,
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

                {/* <Paper variant='outlined' className={classes.root}>
                    <Typography variant='h4'>
                        Interessen
                    </Typography>
                    {interests ?
                        <Typography>
                            <ul>
                                {interests ?
                                    interests.map(item =>
                                        <li key={item[0]}>{item[0]}: {item[1]}</li>)
                                    : null
                                }
                            </ul>
                        </Typography>
                        : null}
                </Paper> */}
                
                <br />
                <Button variant='contained' color='secondary' onClick={this.toggleDelete}>
                    Account löschen
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
    profile: PropTypes.object.isRequired,
    interests: PropTypes.object.isRequired,
}

export default withStyles(styles)(AccountDetail);