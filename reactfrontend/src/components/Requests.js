import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Typography,
  Paper,
  Button,
  CardActions,
} from "@material-ui/core";
import { TeachingbeeAPI, MessageBO } from "../api";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class Requests extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      messages: null,
      content: "",
    };
  }

  componentDidMount() {
    //this.getMessage();
  }

  addMessage = () => {
    let newMessage = new MessageBO(
      this.state.content,
      this.props.sender.getID(),
      this.props.recipient.getID()
    );
    TeachingbeeAPI.getAPI()
      .addMessage(newMessage)
      .then((message) => {
        this.state.messages.push(message);
        this.setState({ content: "" });
        // Backend call sucessfull
        // reinit the dialogs state for a new empty customer
      })
      .catch((e) =>
        this.setState({
          updatingInProgress: false, // disable loading indicator
          updatingError: e, // show error message
        })
      );

    // set loading to true
    this.setState({
      updatingInProgress: true, // show loading indicator
      updatingError: null, // disable error message
    });
  };

  getMessage = () => {
    TeachingbeeAPI.getAPI()
      .getMessage(this.props.sender.getID(), this.props.recipient.getID())
      .then((messages) =>
        this.setState({
          messages: messages,
          loadingInProgress: false,
          loadingError: null,
        })
      )
      .catch((e) =>
        this.setState({
          messages: null,
          loadingInProgress: false,
          loadingError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null,
    });
  };

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, sender, recipient } = this.props;
    const { messages, content } = this.state;
    if (messages) {
      messages.sort((a, b) => {
        return a.getID() - b.getID();
      });
    }

    return (
      <div>
        <h2 class="h2_requests">
          Anfragen
        </h2>
            <Button color="secondary" variant='outlined' onClick={this.handleClose}>
              <ArrowBackIcon />
            </Button>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100ch",
    },
  },
  outerColumn: {
    margin: 5,
    padding: 5,
    height: 50,
  },
  button_style: {
    margin: 5,
    padding: 5,
  }
});

Requests.propTypes = {
  classes: PropTypes.object.isRequired,
  sender: PropTypes.object.isRequired,
  recipient: PropTypes.object.isRequired,
};

export default withStyles(styles)(Requests);

