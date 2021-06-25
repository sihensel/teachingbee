import React, { Component } from "react";
import Chat from './Chat';
import PropTypes from "prop-types";
import { TeachingbeeAPI } from "../api";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import GroupChat from "./GroupChat";

class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatList: [],       // Liste mit den IDs aller Chatpartner
      groupList: [],      // Liste mit den IDs aller Gruppen
      recipient: null,      // Empfänger einer Einzelnachricht
      group: null,          // Empfänger einer Gruppennachricht
      showChat: false,      // toggle, ob der Chat angezeigt wird
      showGroupChat: false, // toggle, ob der Gruppenchat angezeigt wird
    };
  }

  componentDidMount() {
    this.getGroupList();
    this.getChatList();
  }

  // Gruppen des Users auslesen
  getGroupList = () => {
    TeachingbeeAPI.getAPI().getGroupList(this.props.person.getID()).then((response) =>
      this.setState({
        groupList: response,
      })).catch((e) =>
        this.setState({
          groupList: null,
        }));
  }
  
  // Chatliste des Users auslesen
  getChatList = () => {
    TeachingbeeAPI.getAPI().getChatList(this.props.person.getID()).then((response) =>
      this.setState({
        chatList: response,
      })).catch((e) =>
        this.setState({
          chatList: null,
        }));
  }

  // Chat Componente anzeigen
  showChat = (item) => {
    this.setState({
      recipient: item,
      showChat: true
    })
  }

  // Chat schließen
  closeChat = () => {
    this.setState({ showChat: false })
  }

  // Gruppenchat anzeigen
  showGroupChat = (item) => {
    this.setState({
      group: item,
      showGroupChat: true
    })
  }

  // Gruppenchat anzeigen
  closeGroupChat = () => {
    this.getGroupList()
    this.setState({ showGroupChat: false })
  }

  render() {
    const { classes, person } = this.props;
    const { chatList, groupList, recipient, showChat, group, showGroupChat } = this.state;

    return (
      <div>
        {(chatList.length > 0 || groupList.length > 0) ?
          showChat
          ? <Chat sender={person} recipient={recipient} onClose={this.closeChat} />
            : showGroupChat
            ? <GroupChat person={person} group={group} onClose={this.closeGroupChat} />
            :
            <div>
              <h2>Deine Chats</h2>
              <List component="nav" className={classes.root}>
                {groupList.map((item) => {
                  return (
                    <div>
                      <ListItem button onClick={() => this.showGroupChat(item)}>
                        <ListItemText primary={item.getName()}></ListItemText>
                      </ListItem>
                      <Divider />
                    </div>
                  )
                })}
                {chatList.map((item) => {
                  return (
                    <div>
                      <ListItem button onClick={() => this.showChat(item)}>
                        <ListItemText primary={item.getFname() + ' ' + item.getLname()}></ListItemText>
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
              </div>
          : <p>Noch keine Chats vorhanden</p>
        }
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: 10,
  },
});

ChatList.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatList);
