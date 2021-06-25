import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TeachingbeeAPI, GroupBO } from '../../api';

class GroupForm extends Component {

  constructor(props) {
    super(props);

    let name = '', info = '', pid = null;
    if (props.group) {
      name = props.group.getName();
      info = props.group.getInfo();
      pid = props.group.getProfileID();
    }

    this.state = {
      name: name,
      info: info,
      profileID: pid,
    };
    // den State zwischenspeichern
    this.initialState = this.state;
  }

  // Gruppe neu erstellen
  addGroup = () => {
    let newGroup = new GroupBO(this.state.info, this.props.person.getProfileID())
    newGroup.setName(this.state.name)
    TeachingbeeAPI.getAPI().addGroup(newGroup, this.props.person).then(group => {
      this.setState(this.initialState);
      this.props.onClose(group); // call the parent with the object from backend
    });
  }

  // Gruppe bearbeiten
  updateGroup = () => {
    let updatedGroup = Object.assign(new GroupBO(), this.props.group);
    updatedGroup.setName(this.state.name);
    updatedGroup.setInfo(this.state.info);

    TeachingbeeAPI.getAPI().updateGroup(updatedGroup).then(group => {
      // den neuen State als Fallback setzen
      this.initialState.name = this.state.name;
      this.initialState.info = this.state.info;

      this.props.onClose(group);      // Parent-Componente mit dem neuen Objekt aufrufen
    });
  }

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

  render() {
    const { classes, group, show} = this.props;
    const {name, info } = this.state;

    let title = '';
    let header = '';

    if (group) {
      // Person bereits vorhanden => bearbeiten
      title = 'Guppe bearbeiten';
      header = `Gruppen-ID: ${group.getID()}`;
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
  person: PropTypes.object.isRequired,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default withStyles(styles)(GroupForm);