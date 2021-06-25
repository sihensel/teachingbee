import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardActions, Button } from '@material-ui/core';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tabindex: 0
    };
  }

  handleTabChange = (e, newIndex) => {
    this.setState({
      tabindex: newIndex
    })
  };

  showAccount = () => {
    this.props.showAccount();
  }

  showMatching = () => {
    this.props.showMatching();
  }

  showGroup = () => {
    this.props.showGroup();
  }

  showRequests = () => {
    this.props.showRequests();
  }

  signOut = () => {
    this.props.signOut();
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: '#FFD91D' }}>Teachingbee</h1>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={this.showGroup}>
            Gruppe erstellen
            </Button>
          <Button variant="contained" color="primary" onClick={this.showMatching}>
            Matching
            </Button>
          <Button variant="contained" color="primary" onClick={this.showRequests}>
            Anfragen
            </Button>
          <Button variant="contained" color="primary" onClick={this.showAccount}>
            Account
            </Button>
          <Button variant="contained" color="primary" onClick={this.signOut}>
            Abmelden
            </Button>
        </CardActions>
      </div>
    )
  }
}

Header.propTypes = {
  showAccount: PropTypes.func.isRequired,
  showGroup: PropTypes.func.isRequired,
  showMatching: PropTypes.func.isRequired,
  showRequests: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
}

export default Header;