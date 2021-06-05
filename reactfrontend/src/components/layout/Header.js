import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab, Card, CardActions, Button } from '@material-ui/core';

/**
 * Shows the header with the main navigation Tabs within a Paper.
 * 
 * @see See Material-UIs [Tabs](https://material-ui.com/components/tabs/)
 * @see See Material-UIs [Paper](https://material-ui.com/components/paper/)
 * 
 * 
 */
class Header extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /** Handles onChange events of the Tabs component */
  handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {

    return (
      
        <CardActions style={{justifyContent: 'center'}}>
            <Button variant="contained" color="primary">
                Account
            </Button>
            <Button variant="contained" color="primary">
                Chat
            </Button>
            <Button variant="contained" color="primary">
                Matching
            </Button>
        
        </CardActions>
      
    )
  }
}

export default Header;