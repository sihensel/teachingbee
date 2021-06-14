import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Card, CardContent, CardActions, Button } from "@material-ui/core";
import { TeachingbeeAPI } from "../api";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ConfirmDialog from './dialogs/ConfirmDialog';

class Requests extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      personList: null,
      groupList: null,
      isLoaded: false,
      personBOList: [],
      groupBOList: [],
      showConfirm: false,
      action: ''
    };
  }

  componentDidMount() {
    this.getRequests();
    this.getGroupRequests();
  }

  getRequests = () => {
    TeachingbeeAPI.getAPI().getRequests(this.props.person.getID()).then((response) => {
      if (response.length > 0) {
        this.setState({
          personList: response
        })
      } else {
        this.setState({ personList: null })
      }
    })
  };

  getGroupRequests = () => {
    TeachingbeeAPI.getAPI().getGroupRequests(this.props.person.getID()).then((response) => {
      if (response.length > 0) {
        this.setState({
          groupList: response
        })
      } else {
        this.setState({ groupList: null })
      }
    })
  };

  getPerson = (personID) => {
    TeachingbeeAPI.getAPI().getPerson(personID).then((person) => {
      this.setState({ personBOList: [...this.state.personBOList, person] })
    })
  };

  getGroup = (groupID) => {
    TeachingbeeAPI.getAPI().getGroup(groupID).then((group) => {
      this.setState({ groupBOList: [...this.state.groupBOList, group] })
    })
  };

  acceptRequest = (senderID) => {
    TeachingbeeAPI.getAPI().handleRequest(senderID, this.props.person.getID(), 'accept').then(response => {
      this.setState({ showConfirm: true, action: 'person' })
      this.getRequests();
    })
  }

  denyRequest = (senderID) => {
    TeachingbeeAPI.getAPI().handleRequest(senderID, this.props.person.getID(), 'deny').then(response => {
      this.getRequests();
    })
  }

  acceptGroupRequest = (senderID, groupID) => {
    TeachingbeeAPI.getAPI().handleGroupRequest(senderID, groupID, 'accept').then(response => {
      this.setState({ showConfirm: true, action: 'group' })
      this.getGroupRequests();
    })
  }

  denyGroupRequest = (personID, groupID) => {
    TeachingbeeAPI.getAPI().handleGroupRequest(personID, groupID, 'deny').then(response => {
      this.getGroupRequests();
    })
  }

  closeConfirm = () => {
    this.setState({ showConfirm: false })
  }

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
    const { personList, groupList, isLoaded, personBOList, groupBOList, showConfirm, action } = this.state;
    let len = [];

    if (groupList && !isLoaded) {
      groupList.map(item => {
        this.getPerson(item[0])
        this.getGroup(item[1])
      })
      this.setState({ isLoaded: true })
    }
    if (isLoaded) {
      for (let i = 0; i < personBOList.length; i++) {
        len.push(i)
      }
    }

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
                    {person.getFname()} {person.getLname()} ({this.calculateAge(person.getBirthdate())}, {person.getSemester()}. Semester) hat dir eine Anfrage geschickt.
                      </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="primary" onClick={() => this.acceptRequest(person.getID())}>
                    Annehmen
                      </Button>
                  <Button size="small" variant="contained" color="primary" onClick={() => this.denyRequest(person.getID())}>
                    Ablehnen
                      </Button>
                </CardActions>
              </Card>
            );
          })
          : <p>Es stehen keine Personenanfragen zur Verfügung.</p>}
        {groupList ?
          (len.length == personBOList.length && len.length == groupBOList.length) ?
            len.map(index => {
              return (
                <Card className={classes.root} variant="outlined" key={person.getID()}>
                  <CardContent>
                    <Typography variant="h6" component="h4">
                      {personBOList[index].getFname()} {personBOList[index].getLname()} hat eine Anfrage an {groupBOList[index].getName()} geschickt.
                      </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="primary" onClick={() => this.acceptGroupRequest(personBOList[index].getID(), groupBOList[index].getID())}>
                      Annehmen
                      </Button>
                    <Button size="small" variant="contained" color="primary" onClick={() => this.denyGroupRequest(personBOList[index].getID(), groupBOList[index].getID())}>
                      Ablehnen
                      </Button>
                  </CardActions>
                </Card>
              );
            })
            : null
          : <p>Es stehen keine Gruppenanfragen zur Verfügung.</p>
        }
        <ConfirmDialog show={showConfirm} action={action} onClose={this.closeConfirm} />
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