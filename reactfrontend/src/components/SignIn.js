import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';

class SignIn extends Component {

	// Wennd er Button geklickt wird
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

const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});

SignIn.propTypes = {
	classes: PropTypes.object.isRequired,
	onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(SignIn)