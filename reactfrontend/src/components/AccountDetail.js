import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { TeachingbeeAPI } from '../api';
import PersonForm from './dialogs/PersonForm';
import ProfileForm from './dialogs/ProfileForm';
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
            person: null,
            profile: null,
            interests: null,
            loadingInProgress: false,
            loadingError: null,
            showPerson: false,
            showProfile: false
        };
    }

    componentDidMount() {
        this.getPerson();
        this.getProfile();
        this.getInterests();
    }
    getPerson = () => {
        // noch dynamisch gestalten
        TeachingbeeAPI.getAPI().getPerson(this.props.personID).then(person =>
            this.setState({
                person: person,
                loadingInProgress: false,
                loadingError: null
            })).catch(e =>
                this.setState({
                    person: null,
                    loadingInProgress: false,
                    loadingError: e
                })
            );
        this.setState({
            loadingInProgress: true,
            loadingError: null
        });
    }

    getProfile = () => {
        // noch dynamisch gestalten
        TeachingbeeAPI.getAPI().getProfile(this.props.profileID).then(profile =>
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
                profile: profile,     // update PersonBO
                showProfile: false
            });
        } else {
            this.setState({ showProfile: false });
        }
    }

    /** Renders the component */
    render() {
        const { classes, personID, profileID } = this.props;
        const { person, profile, interests, loadingInProgress, loadingError, showPerson, showProfile } = this.state

        return (
            <div>
                <Paper variant='outlined'>
                    <Typography variant='h4'>
                        Person
               </Typography>
                    <Typography>
                        ID: {personID}
                    </Typography>
                    {person ?
                        <Typography>
                            Vorname: {person.getFname()}<br />
                        Nachname: {person.getLname()} <br />
                        Geburtsdatum: {person.getBirthdate()} <br />
                        Semester: {person.getSemester()} <br />
                        Geschlecht: {person.getGender()} <br />
                        Profil-ID: {person.getProfileID()} <br />
                        </Typography>
                        : null}
                    <br />
                    <Button variant='contained' color='primary' onClick={this.showPersonDialog}>
                        Bearbeiten
                </Button>
                </Paper>
                { person ?
                    <PersonForm show={showPerson} onClose={this.closePersonDialog} person={person} />
                    : null}

                <Paper variant='outlined' className={classes.root}>
                    <Typography variant='h4'>
                        Profil
               </Typography>
                    <Typography>
                        ID: {profileID}
                    </Typography>
                    {profile ?
                        <Typography>
                            Studiengang: {profile.getCourse()}<br />
                        Lerntyp: {profile.getStudytype()} <br />
                        Extrovertiertheit: {profile.getExtroverted()} <br />
                        Lernhäufigkeit: {profile.getFrequency()} <br />
                        Online: {profile.getOnline()} <br />
                        Interesse: {profile.getInterest()} <br />
                        </Typography>
                        : null}
                    <br />
                    <Button variant='contained' color='primary' onClick={this.showProfileDialog}>
                        Bearbeiten
                </Button>
                </Paper>
                { profile ?
                    <ProfileForm show={showProfile} onClose={this.closeProfileDialog} profile={profile} interests={interests} />
                    : null}

                <Paper variant='outlined' className={classes.root}>
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
                </Paper>/
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
    personID: PropTypes.string.isRequired,
    profileID: PropTypes.string.isRequired,
}

export default withStyles(styles)(AccountDetail);
//export default AccountDetail;