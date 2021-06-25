import 'date-fns';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { TeachingbeeAPI, PersonBO } from '../../api';


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

    this.state = {
      fname: fn,
      lname: ln,
      birthdate: bd,
      semester: sem,
      gender: gend,
      profileID: pid,
    };
    // State als Fallback speichern
    this.initialState = this.state;
  }

  // Person neu anlegen
  addPerson = () => {
    const bdate = format(this.state.birthdate, 'yyyy-MM-dd');
    let newPerson = new PersonBO(this.state.fname, this.state.lname, bdate, this.state.semester, this.state.gender, this.state.profileID)
    TeachingbeeAPI.getAPI().addPerson(newPerson).then(person => {
      this.setState(this.initialState);
      this.props.onClose(person);
    })
  }

  // Person ändern
  updatePerson = () => {
    let updatedPerson = Object.assign(new PersonBO(), this.props.person);
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
      this.props.onClose(person);
    });
  }

  // Textfelder ändern
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  // Dialog schließen
  handleClose = () => {
    this.setState(this.initialState);
    this.props.onClose();
  }

  // Inhalt des Geschlecht-Dropdowns ändern
  handleChange = (event) => {
    this.setState({ gender: event.target.value });
  }

  // Datum ändern
  handleDateChange = (date) => {
    this.setState({ birthdate: date });
  }

  render() {
    const { classes, person, show } = this.props;
    const { fname, lname, birthdate, semester, gender, profileID } = this.state;

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
                <TextField autoFocus type='text' required fullWidth margin='normal' id='fname' label='Vorname:' value={fname} onChange={this.textFieldValueChange} />
                <TextField type='text' required fullWidth margin='normal' id='lname' label='Nachname:' value={lname} onChange={this.textFieldValueChange} />
                <br />
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

                <TextField type='text' required fullWidth margin='normal' id='semester' label='Semester:' value={semester} onChange={this.textFieldValueChange} />
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