import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputLabel, Select, MenuItem, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TeachingbeeAPI, ProfileBO} from '../../api';
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';

class ProfileForm extends Component {

  constructor(props) {
    super(props);

    let course ='', studytype='', extroverted='', frequency='', online='', interest='';
    if (props.profile) {
        course = props.profile.getCourse();
        studytype = props.profile.getStudytype();
        extroverted = props.profile.getExtroverted();
        frequency = props.profile.getFrequency();
        online = props.profile.getOnline();
        interest = props.profile.getInterest();
    }

    // Init the state
    this.state = {
      course: course,
      fnameValidationFailed: false,
      fnameEdited: false,
      studytype: studytype,
      lnameValidationFailed: false,
      lnameEdited: false,
      extroverted: extroverted,
      frequency: frequency,
      online: online,
      interest: interest,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.initialState = this.state;
  }

  /** Adds the customer */
  addProfile = () => {
    let newProfile = new ProfileBO(this.state.course, this.state.studytype, this.state.extroverted, this.state.frequency, this.state.online, this.state.interest);
    TeachingbeeAPI.getAPI().addProfile(newProfile).then(profile => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState(this.initialState);
      this.props.onClose(profile); // call the parent with the customer object from backend
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

  /** Updates the customeastr */
  
  updateProfile = () => {
    // clone the original cutomer, in case the backend call fails
    let updatedProfile = Object.assign(new ProfileBO(), this.props.profile);
    // set the new attributes from our dialog
    updatedProfile.setCourse(this.state.course);
    updatedProfile.setStudytype(this.state.studytype);
    updatedProfile.setExtroverted(this.state.extroverted);
    updatedProfile.setFrequency(this.state.frequency);
    updatedProfile.setOnline(this.state.online);
    updatedProfile.setInterest(this.state.interest);
    TeachingbeeAPI.getAPI().updateProfile(updatedProfile).then(profile => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.initialState.course = this.state.course;
      this.initialState.studytype = this.state.studytype;
      this.initialState.extroverted = this.state.extroverted;
      this.initialState.frequency = this.state.frequency;
      this.initialState.online = this.state.online;
      this.initialState.interest = this.state.interest;
      this.props.onClose(profile);      // call the parent with the new customer
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // disable loading indicator 
        updatingError: e                        // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    });
  }

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }

  // Änderungen der Dropdowns
  handleCourseChange = (event) => {
    this.setState({ course: event.target.value });
  }
  handleStudytypeChange = (event) => {
    this.setState({ studytype: event.target.value });
  }
  handleExtrovertedChange = (event) => {
    this.setState({ extroverted: event.target.value });
  }
  handleFrequencyChange = (event) => {
    this.setState({ frequency: event.target.value });
  }
  handleOnlineChange = (event) => {
    this.setState({ online: event.target.value });
  }
  handleInterestChange = (event) => {
    this.setState({ interest: event.target.value });
  }

  // Dialog schließen
  handleClose = () => {
    this.setState(this.initialState)
    this.props.onClose()
  }


  /** Renders the component */
  render() {
    const { classes, profile, interests, show } = this.props;
    const { course, fnameValidationFailed, fnameEdited, studytype, lnameValidationFailed, lnameEdited, extroverted, frequency, online, interest, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (profile) {
      // Profil vorhanden => bearbeiten
      title = 'Profil bearbeiten';
      header = `Proil-ID: ${profile.getID()}`;
    } else {
      title = 'Lernprofil anlegen';
      header = 'Bitte alle Felder ausfüllen';
    }

    return (
      show ?
      <div>
        {this.props.children}
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
            <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
                <CloseIcon />
            </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {header}
                </DialogContentText>
                <form className={classes.root} noValidate autoComplete='off'>
                <InputLabel className={classes.label} id='course-label'>In welchem Studiengang bist du?</InputLabel>
                <Select labelId='course-label' id='course' value={course} onChange={this.handleCourseChange}>
                  <MenuItem value='WI'>Wirtschaftsinformatik</MenuItem>
                  <MenuItem value='OM'>Onlinemedienmanagement</MenuItem>
                  <MenuItem value='ID'>Informationsdesign</MenuItem>
                  <MenuItem value='IW'>Informationswissenschaften</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel className={classes.label} id='studytype-label'>Wie lernst du am besten?</InputLabel>
                <Select labelId='studytype-label' id='studytype' value={studytype} onChange={this.handleStudytypeChange}>
                  <MenuItem value='auditiv'>Auditiv</MenuItem>
                  <MenuItem value='kommunikativ'>Kommunikativ</MenuItem>
                  <MenuItem value='motorisch'>Motorisch</MenuItem>
                  <MenuItem value='visuell'>Visuell</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel className={classes.label} id='extroverted-label'>Wie extrovertiert bist du?</InputLabel>
                <Select labelId='extroverted-label' id='extroverted' value={extroverted} onChange={this.handleExtrovertedChange}>
                  <MenuItem value='1'>wenig</MenuItem>
                  <MenuItem value='2'>mäßig</MenuItem>
                  <MenuItem value='3'>sehr</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel className={classes.label} id='frequency-label'>Wie oft möchtest du lernen?</InputLabel>
                <Select labelId='frequency-label' id='frequency' value={frequency} onChange={this.handleFrequencyChange}>
                  <MenuItem value='1'>1 mal die Woche</MenuItem>
                  <MenuItem value='2'>2 mal die Woche</MenuItem>
                  <MenuItem value='3'>3 mal die Woche</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel className={classes.label} id='online-label'>Möchtest du eher Online oder Offline mit anderen lernen?</InputLabel>
                <Select labelId='online-label' id='online' value={online} onChange={this.handleOnlineChange}>
                  <MenuItem value='offline'>offline</MenuItem>
                  <MenuItem value='online'>online</MenuItem>
                  <MenuItem value='beides'>beides</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel className={classes.label} id='interest-label'>Was beschreibt am ehesten deine Interessen oder Hobbies?</InputLabel>
                <Select labelId='interest-label' id='interest' value={interest} onChange={this.handleInterestChange}>
                  {interests.map(item => 
                    <MenuItem value={item[0]}>{item[1]}</MenuItem>
                  )}
                </Select>
                <br />
                </form>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={this.handleClose}>
                    Abbrechen
                </Button>
                { profile ?
                    <Button variant='contained' color='primary' onClick={this.updateProfile}>
                        Speichern
                    </Button>
                    : <Button variant='contained' color='primary' onClick={this.addProfile}>
                        Anlegen
                    </Button>
                }
            </DialogActions>
        </Dialog></div>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  label: {
    color: '#FFD91D',
    fontSize: 17,
    marginBottom: 10,
  },
});

ProfileForm.propTypes = {
  profile: PropTypes.object,
  interests: PropTypes.array.isRequired,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default withStyles(styles)(ProfileForm);