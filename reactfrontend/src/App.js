import './App.css';
import Theme from "./components/layout/Theme";
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseconfig';
import SignIn from './components/SignIn';
import Main from './components/Main';

// Hauptkomponente
class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentUser: null,
			appError: null,
			authError: null,
			authLoading: false
		};
	}

	// Errorhandling
	static getDerivedStateFromError(error) {
		return { appError: error };
	}

	// login mit Firebase
	handleAuthStateChange = user => {
		if (user) {
			this.setState({
				authLoading: true
			});
			// wenn sich der User angemeldet hat
			user.getIdToken().then(token => {
				// der Token wird als Cookie gespeichert, damit festgestellt werden kann 
				document.cookie = `token=${token};path=/`;

				this.setState({
					currentUser: user,
					authError: null,
					authLoading: false
				});
			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
		} else {
			// wenn sich der User ausloggt, soll der Token geleert werden
			document.cookie = 'token=;path=/';

			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

	// mit Firebase anmelden
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	componentDidMount() {
		if (!firebase.apps.length) {
			// schließt aus, dass die Firebase App mehrfach initialisiert wird
			firebase.initializeApp(firebaseConfig);
		}
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}

	render() {
		const { currentUser, appError, authError, authLoading } = this.state;

		return (
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						{
							currentUser ?
								<>
									<Redirect from='/' to='main' />
									<Route exact path='/main'>
										<Main currentUser={currentUser} />
									</Route>
								</>
								:
								<>
									<Redirect to='/index.html' />
									<SignIn onSignIn={this.handleSignIn} />
								</>
						}
					</Container>
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;