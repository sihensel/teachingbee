import './App.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import AccountDetail from './components/AccountDetail';
import SignUp from './components/SignUp';
import { TeachingbeeAPI } from './api';
import ChatList from './components/ChatList';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { Container, ThemeProvider, CssBaseline } from "@material-ui/core";
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
    this.setState({ showAccount: true });
  }
  closeAccount = () => {
    this.setState({ showAccount: false });
  }

  render() {
    const { person, interests } = this.state;
    const { showAccount } = this.state
    return (
      <div>
        { interests ?
          person ?
            showAccount ?
              <AccountDetail person={person} interests={interests} onClose={this.closeAccount} />
              : 
              <div>
                <Button onClick={this.showAccount} color='primary' variant='contained'>
                  Account
                </Button>
                <ChatList person={person} />
              </div>
          : <SignUp interests={interests} />
          : null
        }
      </div>
      //<ThemeProvider theme={Theme}>
      //  <CssBaseline />
      //  <Header />
      //  <Container maxWidth="md">
      //    <div>{person ? <ChatList person={person} /> : null}</div>
      // </Container>
      //</ThemeProvider>
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