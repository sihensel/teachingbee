import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';

/** 
 * Renders a landing page for users who are not signed in. Provides a sign in button 
 * for using an existing google account to sign in. The component uses firebase to 
 * do redirect based signin process.
 * 
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 * 
 */
class SignIn extends Component {


	/** 
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 */
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}

	/** Renders the sign in page, if user objext is null */
	render() {
		const { classes } = this.props;

		return (
			<div>
				<Typography className={classes.root} align='center' variant='h2'>Teachingbee</Typography>
				<Typography className={classes.root} align='center'>Um die App nutzen zu können, melde dich bitte mit Google an.</Typography>
				<Grid container justify='center'>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Mit Google anmelden
      			</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

/** Component specific styles */
const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});

/** PropTypes */
SignIn.propTypes = {
	classes: PropTypes.object.isRequired,
	onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(SignIn)