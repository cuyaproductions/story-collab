import React from 'react';
import {Link} from 'react-router';

const StoryList = (props) => {
  const stories = props.stories.map((story) => {
    const date = new Date(story.timestamp).toLocaleTimeString();
    return (
      <li className="story-list__item" key={story.id}>
        <Link to={`story/${story.id}`} className="story-preview">
          <h3 className="story-preview__title">{story.Title}&hellip;</h3>
          <footer className="story-preview__footer story-data">
            <ul className="story-data__list">
              <li className="story-data__item">
                <bold className="story-data__type">Active Authors: </bold>
                {story.authors.length}
              </li>
              <li className="story-data__item">
                <bold className="story-data__type">Time Created: </bold>
                {date}
              </li>
            </ul>
          </footer>
        </Link>
      </li>
    );
  });

  return (
    <ul className="story-list">
      {stories}
    </ul>
  );
};

export default StoryList;