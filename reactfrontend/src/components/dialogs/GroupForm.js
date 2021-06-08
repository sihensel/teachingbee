import 'date-fns';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { TeachingbeeAPI, GroupBO } from '../../api';
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';


class GroupForm extends Component {

  constructor(props) {
    super(props);

    let name = '', info = '', pid = null;
    if (props.group) {
      name = props.group.getName();
      info = props.group.getInfo();
      pid = props.group.getProfileID();
    }

    // Init the state
    this.state = {
      name: name,
      info: info,
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
  addGroup = () => {
    let newGroup = new GroupBO(this.state.info, this.props.person.getProfileID())
    newGroup.setName(this.state.name)
    TeachingbeeAPI.getAPI().addGroup(newGroup, this.props.person).then(group => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState(this.initialState);
      this.props.onClose(group); // call the parent with the object from backend
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
  updateGroup = () => {
    // clone the original cutomer, in case the backend call fails
    let updatedGroup = Object.assign(new GroupBO(), this.props.group);
    // set the new attributes from our dialog
    updatedGroup.setName(this.state.name);
    updatedGroup.setInfo(this.state.info);
    // das Datum muss bei Änderung noch in das Format 'yyyy-MM-dd' gebracht werden

    TeachingbeeAPI.getAPI().updateGroup(updatedGroup).then(group => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.initialState.name = this.state.name;
      this.initialState.info = this.state.info;

      this.props.onClose(group);      // call the parent with the new group
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
    const { classes, group, show} = this.props;
    const {name, info, profileID, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (group) {
      // Person bereits vorhanden => bearneiten
      title = 'Guppe bearbeiten';
      header = `Gruppen_ID: ${group.getID()}`;
    } else {
      title = 'Gruppe anlegen';
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
                <TextField autoFocus type='text' required fullWidth margin='normal' id='name' label='Gruppenname:' value={name} onChange={this.textFieldValueChange}/> <br />
                <TextField type='text' required fullWidth margin='normal' id='info' label='Gruppenbeschreibung:' value={info} onChange={this.textFieldValueChange}/> <br />
              </form>
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={this.handleClose}>
                Abbrechen
                </Button>
              {group ?
                <Button variant='contained' color='primary' onClick={this.updateGroup}>
                  Speichern
                    </Button>
                : <Button variant='contained' color='primary' onClick={this.addGroup}>
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

GroupForm.propTypes = {
  group: PropTypes.object,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default withStyles(styles)(GroupForm);