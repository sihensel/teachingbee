import './App.css';
<<<<<<< HEAD
import GroupDetail from './components/GroupDetail';
=======
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, ThemeProvider, CssBaseline, Button } from "@material-ui/core";
import { TeachingbeeAPI } from './api';
import AccountDetail from './components/AccountDetail';
import Matching from './components/Matching';
>>>>>>> main
import SignUp from './components/SignUp';
import ChatList from './components/ChatList';
import Theme from "./components/layout/Theme";
import Header from "./components/layout/Header";

class App extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      //currentUser: props.currentUser,   // später die ID von Firebase
      currentUser: 1,   // später die ID von Firebase
      person: null,
      interests: null,
      showAccount: false,
      showMatching: false,
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
      .getPerson(this.state.currentUser)
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
    if (!this.state.showMatching) {
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

  showMatching = () => {
    if (!this.state.showAccount) {
      this.setState({ showMatching: true });
    }
  }
  closeMatching = () => {
    this.setState({ showMatching: false });
  }

  render() {
    const { person, interests } = this.state;
    const { showAccount, showMatching } = this.state
    return (
<<<<<<< HEAD
      <div>
        { interests
          ? person
          ?  <GroupDetail person={person} />
          : <SignUp interests={interests} />
          : null}
      </div>
=======
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Header showAccount={this.showAccount} showMatching={this.showMatching} />
        <Container maxWidth="md">
          <div>
            {interests ?
              person ?
                showAccount ?
                  <AccountDetail person={person} interests={interests} onClose={this.closeAccount} />
                  : showMatching ?
                  <Matching person={person} onClose={this.closeMatching} />
                  :
                    <ChatList person={person} />
                : <SignUp interests={interests} />
              : null
            }
          </div>
        </Container>
      </ThemeProvider>
>>>>>>> main
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  interests: PropTypes.array.isRequired,
  currentUser: PropTypes.number.isRequired,
}

export default App;