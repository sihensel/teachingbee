import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { TeachingbeeAPI } from '../api';
import PersonForm from './dialogs/PersonForm';
import ProfileForm from './dialogs/ProfileForm';
import DeleteDialog from './dialogs/DeleteDialog';
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';

class GroupDetail extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            person: props.person,
            groups: null,
            loadingInProgress: false,
            loadingError: null,
        };
    }
    componentDidMount() {
        if (!this.state.groups) {
            this.getGroup();
        }
    }

    getGroup = () => {
        TeachingbeeAPI.getAPI().getGroupByMember(this.state.person.getID()).then(groups =>
            this.setState({
                groups: groups,
                loadingInProgress: false,
                loadingError: null
            })).catch(e =>
                this.setState({
                    groups: null,
                    loadingInProgress: false,
                    loadingError: e
                })
            );
        this.setState({
            loadingInProgress: true,
            loadingError: null
        });
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
                            </div>
                        : <div>
                            <p>Keine Personendaten verfügbar</p><Button variant='contained' color='primary' onClick={this.showPersonDialog}>
                                Anlegen
                </Button></div>}
                </Paper>

                <Paper variant='outlined'>
                    <Typography variant='h6'>
                        Gruppendaten
               </Typography>
                    
               </Paper>
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

GroupDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    person: PropTypes.object.isRequired,
    
}

export default withStyles(styles)(GroupDetail);