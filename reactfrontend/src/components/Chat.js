import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Button } from "@material-ui/core";
import { TeachingbeeAPI, MessageBO } from "../api";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: null,
      content: "",
    };
  }

  componentDidMount() {
    this.getMessage();
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
      })
  };

  getMessage = () => {
    TeachingbeeAPI.getAPI()
      .getMessage(this.props.sender.getID(), this.props.recipient.getID()).then((messages) =>
        this.setState({
          messages: messages,
        })
      ).catch((e) =>
        this.setState({
          messages: null,
        })
      );
  };

  // Nachricht ändern
  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };

  // Componente schließen
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
        <h2 class="h2_chat_name">
          {recipient.getFname() + " " + recipient.getLname()}
        </h2>
        {messages
          ? messages.map((message) => {
              {
                if (message.getSender() != sender.getID()) {
                  return (
                    <div id="recipient_text">
                      <Grid
                        item
                        xs
                        className={classes.outerColumn}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography>{message.getContent()}</Typography>
                      </Grid>
                      <Divider />
                    </div>
                  );
                } else {
                  return (
                    <div id="sender_text">
                      <Grid
                        item
                        className={classes.outerColumn}
                        container
                        direction="row"
                        alignItems="center"
                        justify="flex-end"
                      >
                        <Typography>{message.getContent()}</Typography>
                      </Grid>
                      <Divider />
                    </div>
                  );
                }
              }
            })
          : null}

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Bitte Text eingeben"
            value={content}
            onChange={this.handleChange}
          />
        </form>
        <Button className={classes.button_style} variant="outlined" color="primary" onClick={this.handleClose}>
        <ArrowBackIcon/>
        </Button>
        <Button color="primary" variant="contained" onClick={this.addMessage}>
          Absenden 
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

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
  sender: PropTypes.object.isRequired,
  recipient: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);
