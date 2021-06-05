import "./App.css";
import AccountDetail from "./components/AccountDetail";
import SignUp from "./components/SignUp";
import { TeachingbeeAPI } from "./api";
import { Component } from "react";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";
import GroupChat from "./components/GroupChat";
import { Container, ThemeProvider, CssBaseline } from "@material-ui/core";
import Theme from "./components/layout/Theme";
import Header from "./components/layout/Header";

class App extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      currentUser: 1, // später die ID von Firebase
      person: null,
      interests: null,
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

  render() {
    const { person, interests } = this.state;
    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="md">
          <div>{person ? <ChatList person={person} /> : null}</div>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;

/* 
{ interests
          ? person
          ?  <AccountDetail person={person} interests={interests} profile={null} />
          : <SignUp interests={interests} />
        : null
      }
*/
