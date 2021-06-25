import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TeachingbeeAPI } from '../../api';

class DeleteDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deleted: false
        };
    }

    // Account löschen
    deleteAccount = () => {
        TeachingbeeAPI.getAPI().deletePerson(this.props.person).then(response => {
            if (response == 'successfull') {
                this.setState({ deleted: true })
            }
        });
    }

    // Dialog schließen
    handleClose = () => {
        this.props.onClose();
    }

    render() {
        const { classes, show } = this.props;
        const { deleted } = this.state;

        let title = 'Account löschen'
        let header = '';
        if (!deleted) {
            header = 'Möchtest du wirklich Deinen Account und alle Deine Daten löschen? Diese Aktion kann nicht rückgängig gemacht werden.'
        } else {
            header = 'Account erfolgreich gelöscht.'
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
    show: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
}

export default withStyles(styles)(DeleteDialog);