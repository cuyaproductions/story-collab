import React, {Component, PropTypes} from 'react';

class StoryBoard extends Component {
  render() {
    const messages = this.props.messages.map((message, messageIndex) => {
      return <span key={messageIndex} className="story-board__message" tabIndex="1">{message} </span>;
    });

    return (
      <section className="story-board">
        <div className="story-board__container">
          {messages}
        </div>
      </section>
    );
  }
}

StoryBoard.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string)
}
export default StoryBoard;