import React, {Component} from 'react';
import io from 'socket.io-client';

import StoryBoard from '../components/StoryBoard';
import StoryInput from '../components/StoryInput';

const data = [
  "Once upon a time",
  "there was a little girl",
  "who liked dragons."
];

const socket = io.connect(window.location.host);

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.storyId || '',
      endTime: 0,
      messages: [],
    }

    this.onAllMessages =  this.onAllMessages.bind(this);
    this.onNewMessage =  this.onNewMessage.bind(this);
    this.onAddMessage =  this.onAddMessage.bind(this);

    socket.on('all messages', this.onAllMessages);
    socket.on('new message', this.onNewMessage);

  }

  componentDidMount() {
    console.log(this.state);
    const {storyId} = this.props.params;
    if (storyId) {
      socket.emit('show story', storyId);
    }
  }

  onAllMessages(data) {
    this.setState(data);
  }

  onNewMessage(data) {
    if (data.id === this.props.params.storyId) {
      this.setState({ messages: data.messages });
    }
  }

  onAddMessage(message) {
    this.onNewMessage(message);
    socket.emit('add message', {id: this.props.params.storyId, message: message});
  }

  render() {
    return (
      <div className="story">
        <StoryBoard messages={this.state.messages} />
        <StoryInput onAddMessage={this.onAddMessage} />
      </div>
    );
  }
}

export default Story;