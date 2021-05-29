import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TeachingbeeAPI } from '../../api';
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
class DeleteDialog extends Component {

    constructor(props) {
        super(props);


        // Init the state
        this.state = {
            deleted: false
        };
    }


    deleteAccount = () => {
        TeachingbeeAPI.getAPI().deletePerson(this.props.person);
        this.setState({ deleted: true })
    }

    // Close the Dialog
    handleClose = () => {
        this.props.onClose();
    }

    /** Renders the component */
    render() {
        const { classes, show } = this.props;
        const { deleted } = this.state;

        let title = 'Account löschen'
        let header = '';
        if (deleted) {
            header = 'Account erfolgreich gelöscht.'
        } else {
            header = 'Möchtest du wirklich Deinen Account und alle Deine Daten löschen?'
        }

        return (
            show ?
                <div>
                    {this.props.children}
                    <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
                        <DialogTitle id='form-dialog-title'>{title}
                            { !deleted ?
                            <IconButton className={classes.closeButton} onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                            : null }
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {header}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            { !deleted ?
                            <div>
                            <Button color='secondary' onClick={this.handleClose}>
                                Abbrechen
                            </Button>
                            <Button variant='contained' color='secondary' onClick={this.deleteAccount}>
                                Ja, löschen
                            </Button>
                            </div>
                            : <Button variant='contained' color='primary' onClick={this.handleClose}>
                                Ok
                            </Button>}
                        </DialogActions>
                    </Dialog>
                    </div>
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

DeleteDialog.propTypes = {
    personID: PropTypes.number,
    show: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
}

export default withStyles(styles)(DeleteDialog);


