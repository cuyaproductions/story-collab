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
      id: '',
      endTime: 0,
      messages: [],
    }

    this.onAllMessages =  this.onAllMessages.bind(this);

    socket.on('all messages', this.onAllMessages);
  }

  componentDidMount() {
    const {storyId} = this.props.params;
    if (storyId) {
      socket.emit('show story', storyId);
    }
  }

  onAllMessages(data) {
    this.setState(data);
  }

  render() {
    console.log(this.state);
    return (
      <div className="story">
        <StoryBoard messages={this.state.messages} />
        <StoryInput />
      </div>
    );
  }
}

export default Story;