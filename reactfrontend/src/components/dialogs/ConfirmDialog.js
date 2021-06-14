import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TeachingbeeAPI } from '../../api';
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';


class ConfirmDialog extends Component {

    constructor(props) {
        super(props);

        // Init the state
        this.state = {
        };
    }
    

    // Close the Dialog
    handleClose = () => {
        this.props.onClose();
    }

    /** Renders the component */
    render() {
        const { classes, show, action } = this.props;

        let title = 'Anfrage erfolgreich angenommen';
        let header = '';
        if (action == 'person') {
            header = 'Nun könnt ihr über den Chat miteinander schreiben.';
        } else if (action == 'group') {
            header = 'Erfolgreich zur Gruppe hinzugefügt.'
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
                        </DialogContent>
                        <DialogActions>
                            <Button variant='contained' color='primary' onClick={this.handleClose}>
                                Ok
                            </Button>
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

ConfirmDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
}

export default withStyles(styles)(ConfirmDialog);