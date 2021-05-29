import './App.css';
import AccountDetail from './components/AccountDetail';
import SignUp from './components/SignUp';
import { TeachingbeeAPI } from './api';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      currentUser: '',   // später die ID von Firebase
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
    TeachingbeeAPI.getAPI().getPerson(this.state.currentUser).then(person =>
      this.setState({
        person: person,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({
          person: null,
          loadingInProgress: false,
          loadingError: e
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
  }
  getInterests = () => {
    TeachingbeeAPI.getAPI().getInterests().then(interests =>
      this.setState({
        interests: interests,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({
          interests: null,
          loadingInProgress: false,
          loadingError: e
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
  }



  render() {
    const { person, interests } = this.state;
    return (
      <div>
        { interests ?
          person ?
            <AccountDetail person={person} interests={interests} profile={null} />
            : <SignUp interests={interests} />
          : null}
      </div>
    );
  }
}
export default App;