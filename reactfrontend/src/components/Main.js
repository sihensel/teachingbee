import '../App.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, ThemeProvider, CssBaseline, Button } from "@material-ui/core";
import { TeachingbeeAPI } from '../api';
import AccountDetail from './AccountDetail';
import Matching from './Matching';
import SignUp from './SignUp';
import ChatList from './ChatList';
import Requests from './Requests';
import Theme from "./layout/Theme";
import Header from "./layout/Header";
import GroupForm from './dialogs/GroupForm';
import firebase from 'firebase/app';

class Main extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      currentUser: props.currentUser,
      //currentUser: 4,  // später die ID von Firebase
      person: null,
      interests: null,
      showGroup: false,
      showAccount: false,
      showMatching: false,
      showRequests: false,
      loadingInProgress: false,
      loadingError: null,
    };
  }

  componentDidMount() {
    this.getPerson();
    this.getInterests();
  }

  getPerson = () => {
    TeachingbeeAPI.getAPI()
      .getPersonByFirebase(this.state.currentUser.uid)
      .then((person) =>
        this.setState({
          person: person,
          loadingInProgress: false,
          loadingError: null,
        })
      )
      .catch((e) =>
        this.setState({
          person: null,
          loadingInProgress: false,
          loadingError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null,
    });
  };

  getInterests = () => {
    TeachingbeeAPI.getAPI()
      .getInterests()
      .then((interests) =>
        this.setState({
          interests: interests,
          loadingInProgress: false,
          loadingError: null,
        })
      )
      .catch((e) =>
        this.setState({
          interests: null,
          loadingInProgress: false,
          loadingError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null,
    });
  };

  showAccount = () => {
    if (!this.state.showGroup && !this.state.showMatching && !this.state.showRequests) {
      this.setState({ showAccount: true });
    }
  }

  closeAccount = person => {
    if (person) {
      this.setState({
        person: person,
        showAccount: false
      });
    } else {
      this.setState({ showAccount: false });
    }
  }

  showGroup = () => {
    if (!this.state.showAccount && !this.state.showMatching && !this.state.showRequests) {
      this.setState({ showGroup: true });
    }
  }

  closeGroup = () => {
    this.setState({ showGroup: false });

  }

  showMatching = () => {
    if (!this.state.showAccount && !this.state.showGroup && !this.state.showRequests) {
      this.setState({ showMatching: true });
    }
  }

  closeMatching = () => {
    this.setState({ showMatching: false });
  }

  showRequests = () => {
    if (!this.state.showAccount && !this.state.showGroup && !this.state.showMatching) {
      this.setState({ showRequests: true });
    }
  }

  closeRequests = () => {
    this.setState({ showRequests: false });
  }

  closeSignup = (person) => {
    this.setState({
      currentUser: person.getID(),
      person: person,
    });
  }

  handleSignOut = () => {
    firebase.auth().signOut();
  }

  render() {
    const { person, interests, currentUser, showAccount, showMatching, showGroup, showRequests } = this.state;
    console.log(person)
    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Header showAccount={this.showAccount} showMatching={this.showMatching} showGroup={this.showGroup} showRequests={this.showRequests} signOut={this.handleSignOut}/>
        <Container maxWidth="md">
          <div>
            {interests
              ? (person && person.getID())
                ? showAccount
                  ? <AccountDetail person={person} interests={interests} onClose={this.closeAccount} />
                  : showMatching
                    ? <Matching person={person} onClose={this.closeMatching} />
                    : showRequests
                      ? <Requests person={person} onClose={this.closeRequests} />
                      :
                      <div>
                        <GroupForm group={null} show={showGroup} onClose={this.closeGroup} person={person} />
                        <ChatList person={person} />
                      </div>
                : <SignUp interests={interests} onClose={this.closeSignup} currentUser={currentUser} />
              : null
            }
          </div>
        </Container>
      </ThemeProvider>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.number.isRequired,
}

export default Main;