import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Button, Card, CardActions, CardContent, Grid } from "@material-ui/core";
import { TeachingbeeAPI } from "../api";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class Matching extends Component {
  constructor(props) {
    super(props);

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
    TeachingbeeAPI.getAPI().matchPerson(this.props.person.getID()).then((response) =>
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
    TeachingbeeAPI.getAPI().matchGroup(this.props.person.getID()).then((response) =>
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

  addRequest = (recipientID) => {
    TeachingbeeAPI.getAPI().addRequest(this.props.person.getID(), recipientID).then((response) => {
      if (response == 'successfull') {
        this.matchPerson();
      }
    })
  }

  addGroupRequest = (groupID) => {
    TeachingbeeAPI.getAPI().addGroupRequest(this.props.person.getID(), groupID).then((response) => {
      if (response == 'successfull') {
        this.matchGroup();
      }
    })
  }

  handleClose = () => {
    this.props.onClose();
  };

  calculateAge = (birthday) => {
    /**
     * @see https://codereview.stackexchange.com/questions/251301/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
     */
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
    const { classes } = this.props;
    const { personList, groupList } = this.state;

    return (
      <div>
        <div>
          <h2>Lernpartner finden</h2>
          <Button
            className={classes.button_style}
            variant="outlined"
            color="primary"
            onClick={this.handleClose}>
            <ArrowBackIcon />
          </Button>
        </div>
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ marginTop: 10 }}
        >
          {personList
            ? personList.map((person) => {
              return (
                <Grid item style={{ width: 700 }}>
                  <Card variant="outlined" key={person.getID()}>
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
                        onClick={() => this.addRequest(person.getID())}
                      >
                        Kontakt anfragen
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
            : null
          }
          {groupList
            ? groupList.map((group) => {
              return (
                <Grid item style={{ width: 700 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" component="h4">
                        {group.getName()}
                      </Typography>
                      <Typography variant="h6" component="h4">
                        {group.getInfo()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => this.addGroupRequest(group.getID())}
                      >
                        Kontakt anfragen
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
            : <p>Es konnten keine passen Gruppen gefunden werden.</p>
          }
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  content: {
    fontSize: 18,
    marginTop: 7,
  },
  button_style: {
    marginBottom: 5,
    padding: 5,
  },
});

Matching.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(Matching);