import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Card, CardContent, CardActions, Button } from "@material-ui/core";
import { TeachingbeeAPI, MessageBO } from "../api";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class Requests extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      personList: null,
    };
  }

  componentDidMount() {
    this.getRequests();
  }

  addMessage = () => {
    let newMessage = new MessageBO(
      this.state.content,
      this.props.sender.getID(),
      this.props.recipient.getID()
    );
    TeachingbeeAPI.getAPI().addMessage(newMessage).then((message) => {
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

  getRequests = () => {
    TeachingbeeAPI.getAPI().getRequests(this.props.person.getID()).then((response) =>
        this.setState({
          personList: response,
          loadingInProgress: false,
          loadingError: null,
        })).catch((e) =>
        this.setState({
          personList: null,
          loadingInProgress: false,
          loadingError: e,
        }));
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

  calculateAge = (birthday) => {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  render() {
    const { classes, person } = this.props;
    const { personList } = this.state;

    console.log(this.props)
    console.log(personList)

    return (
      <div>
        <h2 class="h2_requests">
          Anfragen
        </h2>
            <Button className={classes.button_style} color="secondary" variant='outlined' onClick={this.handleClose}>
              <ArrowBackIcon />
            </Button>
        { personList ?
          personList.map(person => {
            return (
                  <Card className={classes.root} variant="outlined" key={person.getID()}>
                    <CardContent>
                      <Typography variant="h6" component="h4">
                        {person.getFname()} {person.getLname()}
                      </Typography>
                      <Typography className={classes.content} color="textPrimary">
                        {this.calculateAge(person.getBirthdate())} Jahre alt
                      </Typography>
                      <Typography className={classes.content} color="textPrimary" >
                        {person.getSemester()}. Semester
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant="contained" color="primary" onClick={() => this.sendRequest(person.getID())}>
                        Annehmen
                      </Button>
                      <Button size="small" variant="contained" color="primary" onClick={() => this.sendRequest(person.getID())}>
                        Ablehnen
                      </Button>
                    </CardActions>
                  </Card>
            );
          })
          : null
        }
  
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
  content: {
    fontSize: 18,
    marginTop: 7,
  },
  button_style: {
    margin: 5,
    padding: 5,
  }
});

Requests.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
};

export default withStyles(styles)(Requests);