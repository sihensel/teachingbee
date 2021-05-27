import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TeachingbeeAPI, ProfileBO} from '../../api';
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
  /*
  addCustomer = () => {
    let newPerson = new PersonBO(this.state.fname, this.state.lname, this.state.birthdate, this.state.semester, this.state.gender);
    TeachingbeeAPI.getAPI().addPerson(newPerson).then(person => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState(this.baseState);
      this.props.onClose(person); // call the parent with the customer object from backend
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
  */

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
    console.log(updatedProfile)
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
      this.props.onClose(updatedProfile);      // call the parent with the new customer
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
    
      console.log(interest)
      console.log('state:', this.state.interest)

    let title = '';
    let header = '';

    if (profile) {
      // customer defindet, so ist an edit dialog
      title = `Profil bearbeiten (ID: ${profile.getID()})`;
      //header = `Person ID: ${profile.getID()}`;
    } else {
      title = 'Person anlegen';
      //header = 'Bitte Daten eingeben';
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
                {/*<DialogContentText>
                    {header}
                </DialogContentText>*/}
                <form className={classes.root} noValidate autoComplete='off'>
                <InputLabel id='course-label'>Studiengang</InputLabel>
                <Select labelId='course-label' id='course' value={course} onChange={this.handleCourseChange}>
                  <MenuItem value='WI'>Wirtschaftsinformatik</MenuItem>
                  <MenuItem value='OM'>Onlinemedienmanagement</MenuItem>
                  <MenuItem value='ID'>Informationsdesign</MenuItem>
                  <MenuItem value='IW'>Informationswissenschaften</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel id='studytype-label'>Lerntyp</InputLabel>
                <Select labelId='studytype-label' id='studytype' value={studytype} onChange={this.handleStudytypeChange}>
                  <MenuItem value='auditiv'>Auditiv</MenuItem>
                  <MenuItem value='kommunikativ'>Kommunikativ</MenuItem>
                  <MenuItem value='motorisch'>Motorisch</MenuItem>
                  <MenuItem value='visuell'>Visuell</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel id='extroverted-label'>Extrovertiertheit</InputLabel>
                <Select labelId='extroverted-label' id='extroverted' value={extroverted} onChange={this.handleExtrovertedChange}>
                  <MenuItem value='1'>wenig</MenuItem>
                  <MenuItem value='2'>mäßig</MenuItem>
                  <MenuItem value='3'>viel</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel id='frequency-label'>Lernhäufigkeit</InputLabel>
                <Select labelId='frequency-label' id='frequency' value={frequency} onChange={this.handleFrequencyChange}>
                  <MenuItem value='1'>1 mal die Woche</MenuItem>
                  <MenuItem value='2'>2 mal die Woche</MenuItem>
                  <MenuItem value='3'>3 mal die Woche oder mehr</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel id='online-label'>Online/Offline?</InputLabel>
                <Select labelId='online-label' id='online' value={online} onChange={this.handleOnlineChange}>
                  <MenuItem value='offline'>offline</MenuItem>
                  <MenuItem value='online'>online</MenuItem>
                  <MenuItem value='beides'>beides</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel id='interest-label'>Interesse/Hobby</InputLabel>
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
                    : <Button variant='contained' color='primary'>
                        Hinzufügen
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
});

ProfileForm.propTypes = {
  profile: PropTypes.object,
  interests: PropTypes.array,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default withStyles(styles)(ProfileForm);


