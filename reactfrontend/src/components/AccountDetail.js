import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography, Paper, Button, Table, TableCell, TableContainer, TableRow, CardActions } from "@material-ui/core";
import { TeachingbeeAPI } from "../api";
import PersonForm from "./dialogs/PersonForm";
import ProfileForm from "./dialogs/ProfileForm";
import DeleteDialog from "./dialogs/DeleteDialog";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class AccountDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interests: props.interests,
      person: props.person,
      profile: null,
      showPerson: false,
      showProfile: false,
      showDelete: false,
    };
  }
  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    TeachingbeeAPI.getAPI().getProfile(this.state.person.getProfileID()).then((profile) =>
        this.setState({
          profile: profile,
        })
      ).catch((e) =>
        this.setState({
          profile: null,
        })
      );
  };

  // PersonDialog anzeigen
  showPersonDialog = () => {
    this.setState({ showPerson: true });
  };
  closePersonDialog = (person) => {
    if (person) {
      this.setState({
        person: person, // update PersonBO
        showPerson: false,
      });
    } else {
      this.setState({ showPerson: false });
    }
  };

  // handle ProfileDialog
  showProfileDialog = () => {
    this.setState({ showProfile: true });
  };
  closeProfileDialog = (profile) => {
    if (profile) {
      this.setState({
        profile: profile, // update ProfileBO
        showProfile: false,
      });
    } else {
      this.setState({ showProfile: false });
    }
  };

  // DeleteDialog anzeigen
  toggleDelete = () => {
    this.setState({ showDelete: !this.state.showDelete });
  };

  // AccountDetail schließen
  handleClose = () => {
    this.props.onClose(this.state.person);
  };

  render() {
    const { classes, interests } = this.props;
    const { person, profile, showPerson, showProfile, showDelete } = this.state;
    const ExtrovertList = ["wenig", "mäßig", "sehr"];

    return (
      <div>
        {person && profile && interests
          ? <div>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>
                <ArrowBackIcon/>
            </Button>
            <Paper variant="outlined" className={classes.root}>
              <Typography variant="h6">Personendaten</Typography>
              <div>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="Personendaten"
                  >
                    <TableRow>
                      <TableCell>Vorname</TableCell>
                      <TableCell>{person.getFname()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nachname</TableCell>
                      <TableCell>{person.getLname()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Geburtsdatum</TableCell>
                      <TableCell>{person.getBirthdate()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Semester</TableCell>
                      <TableCell>{person.getSemester()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Geschlecht</TableCell>
                      <TableCell>{person.getGender()}</TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.showPersonDialog}
                >
                  Bearbeiten
                </Button>
              </div>
            </Paper>

            <Paper variant="outlined" className={classes.root}>
              <Typography variant="h6">Lernprofil</Typography>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="Personendaten"
                >
                  <TableRow>
                    <TableCell>Studiengang</TableCell>
                    <TableCell>{profile.getCourse()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lerntyp</TableCell>
                    <TableCell>{profile.getStudytype()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Extrovertiertheit</TableCell>
                    <TableCell>
                      {ExtrovertList[profile.getExtroverted() - 1]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lernhäufigkeit</TableCell>
                    <TableCell>
                      {profile.getFrequency()} mal die Woche
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lernort</TableCell>
                    <TableCell>{profile.getOnline()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Interesse</TableCell>
                    <TableCell>
                      {interests[profile.getInterest() - 1][1]}
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.showProfileDialog}
              >
                Bearbeiten
              </Button>
            </Paper>
            <br />
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.toggleDelete}>
                Account löschen
              </Button>
            </CardActions>
            <ProfileForm
              show={showProfile}
              onClose={this.closeProfileDialog}
              profile={profile}
              interests={interests}
            />
          </div>
        : null}
        <PersonForm
          show={showPerson}
          onClose={this.closePersonDialog}
          person={person}
        />
        <DeleteDialog
          show={showDelete}
          onClose={this.toggleDelete}
          person={person}
        />
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  table: {
    minWidth: 650,
  },
});

AccountDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  interests: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(AccountDetail);