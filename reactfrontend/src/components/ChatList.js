import React, { Component } from "react";
import Chat from './Chat';
import PropTypes from "prop-types";
import { TeachingbeeAPI } from "../api";
import { withStyles, Typography, Paper, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

class ChatList extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      chatList: null,   // Liste mit den IDs aller Chatpartner
      groupList: null,
      personList: [],   // Liste mit den Personenobjekten aller Chatpartner
      isLoaded: false, // bool, ob die personList geladen wurde
      groupisLoaded: false,  
      recipient: null,  // Empfänger der Nachricht
      showChat: false,  // toggle, ob der Chat angezeigt wird
    };
  }

  componentDidMount() {
    this.getChatList();
    this.getGroupList();
  }

  getGroupList = () => {
    TeachingbeeAPI.getAPI().getGroupList(this.props.person.getID()).then((response) =>
      this.setState({
        groupList: response,
        loadingInProgress: false,
        loadingError: null,
      })).catch((e) =>
        this.setState({
          groupList: null,
          loadingInProgress: false,
          loadingError: e,
        }));
  }

  getChatList = () => {
    TeachingbeeAPI.getAPI().getChatList(this.props.person.getID()).then((response) =>
      this.setState({
        chatList: response,
        loadingInProgress: false,
        loadingError: null,
      })).catch((e) =>
        this.setState({
          chatList: null,
          loadingInProgress: false,
          loadingError: e,
        }));
  }

  showChat = (item) => {
    this.setState({
      recipient: item,
      showChat: true
    })
  }

  closeChat = () => {
    this.setState({ showChat: false })
  }

  getPersonList = () => {
    this.state.chatList.map(item => {
      TeachingbeeAPI.getAPI().getPerson(item).then(response => {
        this.setState(prevState => ({
          personList: [...prevState.personList, response],
          isLoaded: true
        }))
      })
    })
  }

  render() {
    const { classes, person } = this.props;
    const { chatList, groupList, personList, recipient, showChat, isLoaded } = this.state;

    if (chatList && !isLoaded) {
      this.getPersonList()
    }
  

    return (
      <div>
        {chatList ?
          showChat ?
            <Chat sender={person} recipient={recipient} onClose={this.closeChat} />
            :
            (personList.length == chatList.length)
              ?
              <List component="nav" className={classes.root}>
                {/*groupList.map((item) => {
                  return (
                    <p>{item}</p>
                  )
                })*/}
                {personList.map((item) => {
                  return (
                    <div>
                      <ListItem button onClick={() => this.showChat(item.getID())}>
                        <ListItemText primary={item.getFname() + ' ' + item.getLname()}></ListItemText>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
              : null
          : null}
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
