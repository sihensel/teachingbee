import 'date-fns';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { TeachingbeeAPI, PersonBO } from '../../api';
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';


class PersonForm extends Component {

  constructor(props) {
    super(props);

    let fn = '', ln = '', bd = 0, sem = 0, gend = '', pid = null;
    if (props.person) {
      fn = props.person.getFname();
      ln = props.person.getLname();
      bd = props.person.getBirthdate();
      sem = props.person.getSemester();
      gend = props.person.getGender();
      pid = props.person.getProfileID();
    }

    // Init the state
    this.state = {
      fname: fn,
      fnameValidationFailed: false,
      fnameEdited: false,
      lname: ln,
      lnameValidationFailed: false,
      lnameEdited: false,
      birthdate: bd,
      semester: sem,
      gender: gend,
      profileID: pid,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.initialState = this.state;
  }

  /** Adds the customer
   * @todo Error handling/verification still missing
   */
  addPerson = () => {
    const bdate = format(this.state.birthdate, 'yyyy-MM-dd');
    let newPerson = new PersonBO(this.state.fname, this.state.lname, bdate, this.state.semester, this.state.gender, this.state.profileID)
    TeachingbeeAPI.getAPI().addPerson(newPerson).then(person => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState(this.initialState);
      this.props.onClose(person); // call the parent with the object from backend
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

  /** Updates the person
   * @todo !!!ERROR HANDLING IS STILL MISSING!!!
   */
  updatePerson = () => {
    // clone the original cutomer, in case the backend call fails
    let updatedPerson = Object.assign(new PersonBO(), this.props.person);
    // set the new attributes from our dialog
    updatedPerson.setFname(this.state.fname);
    updatedPerson.setLname(this.state.lname);
    // das Datum muss bei Änderung noch in das Format 'yyyy-MM-dd' gebracht werden
    if (this.state.birthdate === this.initialState.birthdate) {
      updatedPerson.setBirthdate(this.state.birthdate)
    } else {
      const bdate = format(this.state.birthdate, 'yyyy-MM-dd');
      updatedPerson.setBirthdate(bdate);
    }
    updatedPerson.setSemester(this.state.semester);
    updatedPerson.setGender(this.state.gender);

    TeachingbeeAPI.getAPI().updatePerson(updatedPerson).then(person => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.initialState.fname = this.state.fname;
      this.initialState.lname = this.state.lname;
      // Datumsformat beachten (s.o.)
      if (this.state.birthdate === this.initialState.birthdate) {
        this.initialState.birthdate = this.state.birthdate;
      } else {
        const bdate = format(this.state.birthdate, 'yyyy-MM-dd');
        this.initialState.birthdate = bdate;
      }
      this.initialState.semester = this.state.semester;
      this.initialState.gender = this.state.gender;
      this.props.onClose(person);      // call the parent with the new person
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

  // Close the Dialog
  handleClose = () => {
    this.setState(this.initialState);
    this.props.onClose();
  }

  handleChange = (event) => {
    this.setState({ gender: event.target.value });
  }
  handleDateChange = (date) => {
    this.setState({ birthdate: date });
  }

  /** Renders the component */
  render() {
    const { classes, person, show } = this.props;
    const { fname, fnameValidationFailed, fnameEdited, lname, lnameValidationFailed, lnameEdited, birthdate, semester, gender, profileID, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (person) {
      // Person bereits vorhanden => bearneiten
      title = 'Person bearbeiten';
      header = `Person ID: ${person.getID()}`;
    } else {
      title = 'Person anlegen';
      header = 'Bitte Daten eingeben';
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
                <TextField autoFocus type='text' required fullWidth margin='normal' id='fname' label='Vorname:' value={fname} onChange={this.textFieldValueChange} error={fnameValidationFailed} />
                <TextField type='text' required fullWidth margin='normal' id='lname' label='Nachname:' value={lname} onChange={this.textFieldValueChange} error={lnameValidationFailed} />
                <br />
                <InputLabel id='gender-label'>Geschlecht</InputLabel>
                <Select labelId='gender-label' id='gender' value={gender} onChange={this.handleChange}>
                  <MenuItem value='weiblich'>weiblich</MenuItem>
                  <MenuItem value='männlich'>männlich</MenuItem>
                  <MenuItem value='divers'>divers</MenuItem>
                </Select>
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker disableToolbar required variant='inline' format='dd.MM.yyyy' margin='normal' id='birthdate' label='Geburtsdatum' value={birthdate} onChange={this.handleDateChange} />
                </MuiPickersUtilsProvider>

                <TextField type='text' required fullWidth margin='normal' id='semester' label='Semester:' value={semester} onChange={this.textFieldValueChange} error={fnameValidationFailed} />
              </form>
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={this.handleClose}>
                Abbrechen
                </Button>
              {person ?
                <Button variant='contained' color='primary' onClick={this.updatePerson}>
                  Speichern
                    </Button>
                : <Button variant='contained' color='primary' onClick={this.addPerson}>
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
});

PersonForm.propTypes = {
  person: PropTypes.object,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default withStyles(styles)(PersonForm);