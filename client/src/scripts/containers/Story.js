import React, {Component} from 'react';

import StoryBoard from '../components/StoryBoard';
import StoryInput from '../components/StoryInput';

const data = [
  "Once upon a time",
  "there was a little girl",
  "who liked dragons."
];

class Story extends Component {
  render() {
    return (
      <div className="story">
        <StoryBoard messages={data} />
        <StoryInput />
      </div>
    );
  }
}

export default Story;