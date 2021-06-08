import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { TeachingbeeAPI } from "../api";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';

class Matching extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      personList: null,
      groupList: null,
    };
  }
  componentDidMount() {
    this.matchPerson();
    this.matchGroup();
  }

  matchPerson = () => {
    TeachingbeeAPI.getAPI()
      .matchPerson(this.props.person.getID())
      .then((response) =>
        this.setState({
          personList: response,
          loadingInProgress: false,
          loadingError: null,
        })
      )
      .catch((e) =>
        this.setState({
          profile: null,
          loadingInProgress: false,
          loadingError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null,
    });
  };

  matchGroup = () => {
    TeachingbeeAPI.getAPI()
      .matchGroup(this.props.person.getID())
      .then((response) =>
        this.setState({
          groupList: response,
          loadingInProgress: false,
          loadingError: null,
        })
      )
      .catch((e) =>
        this.setState({
          profile: null,
          loadingInProgress: false,
          loadingError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null,
    });
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

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { personList, groupList } = this.state;
    console.log(personList, groupList);

    return (
      <div>
        {personList && groupList ? (
          <div>
            <h2>Lernpartner finden</h2>
            <div>
              <Button
                className={classes.button_style}
                variant="outlined"
                color="primary"
                onClick={this.handleClose}>
                <ArrowBackIcon />
              </Button>

              {personList.map((person) => {
                return (
                  <Card className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography variant="h6" component="h4">
                        {person.getFname()} {person.getLname()}
                      </Typography>
                      <Typography
                        className={classes.content}
                        color="textPrimary"
                      >
                        {this.calculateAge(person.getBirthdate())} Jahre alt
                      </Typography>
                      <Typography
                        className={classes.content}
                        color="textPrimary"
                      >
                        {person.getSemester()}. Semester
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={this.requestContact}
                      >
                        Kontakt anfragen
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </div>
            <div>
              {groupList.map((group) => {
                return (
                  <Card className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography variant="h6" component="h4">
                        {group.getName()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={this.requestContact}
                      >
                        Kontakt anfragen
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <p>Oops, hier scheint etwas shiefgelaufen zu sein.</p>
            <Button color="secondary" onClick={this.handleClose}>
              <ArrowBackIcon />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    maxWidth: 300,
  },
  content: {
    fontSize: 18,
    marginTop: 7,
  },
  button_style: {
    marginBottom: 5,
    padding:5,
  },
});

Matching.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(Matching);
//export default Matching;
