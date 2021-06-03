import React, { Component } from "react";
import Chat from './Chat';
import PropTypes from "prop-types";
import { TeachingbeeAPI, MessageBO } from "../api";
import { withStyles, Typography, Paper, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
//chat js import

class ChatList extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      chatList: null,
    };
  }

  componentDidMount() {
    this.getChatList();
  }

  getChatList = () => {
    TeachingbeeAPI.getAPI()
      .getChatList(this.props.person.getID())
      .then((res) =>
        this.setState({
          chatList: res,
          loadingInProgress: false,
          loadingError: null,
        })
      )
      .catch((e) =>
        this.setState({
          chatList: null,
          loadingInProgress: false,
          loadingError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null,
    });
  };

  enterChat = (item) => {
      console.log(item)
  }
  

  render() {
    const { classes, person } = this.props;
    const { chatList } = this.state;

    return (
      <div>
        {chatList ? (
          <List component="nav" className={classes.root}>
            {chatList.map((item) => {
              return (
                  <div>
                <ListItem key="1234" button onClick={() => this.enterChat(item)}>
                  <ListItemText primary={item}></ListItemText>
                </ListItem>
                <Divider />
                </div>
              );
            })}
          </List>
        ) : null}
      </div>
    );
  }
}

const styles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
});

ChatList.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatList);
