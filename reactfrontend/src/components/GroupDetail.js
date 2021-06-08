import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { TeachingbeeAPI } from '../api';
import CreateGroup from '../Create_Group';
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
            showGroup: false,
        };
    }
    componentDidMount() {
        if (!this.state.groups) {
            this.getGroup();
        }
    }
    componentDidUpdate() {
        console.log(this.state.groups)
    }

    // handle GroupDialog
    showGroupDialog = () => {
        this.setState({ showGroup: true });
    }
    closePersonDialog = group => {
        if (group) {
            this.setState({
                group: group,     // update GroupBO
                showGroup: false
            });
        } else {
            this.setState({ showGroup: false });
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
        const { person, groups, loadingInProgress, loadingError, showGroup} = this.state

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
                {groups ? 
                    groups.legth>0 ?
                      groups.map((group)=>
                        <div>
                            <Typography>
                                Gruppenname: {group.getGname()}<br />
                            Admin: {group.getAdmin()} <br />
                            Teilnehmer: {group.getMembers()} <br />
                            Anfragen: {group.getRecievedRequests()} <br />
                            {/*Gruppenprofil hinzufügen */ }
                            </Typography>
                            </div>
                      )
                        : <div>
                            <p>Keine Gruppe verfügbar</p>
                            </div> : <p>Lädt noch</p>
               }   
               </Paper>
               <CreateGroup person={person}>
               </CreateGroup>
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