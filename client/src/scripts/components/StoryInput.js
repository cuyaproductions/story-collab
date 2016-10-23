import React from 'react';

const StoryInput = () => {
  return (
    <footer className="user-input">
      <form className="user-input__form" id="input-form">
        <input type="text" id="input-text" className="user-input__text" placeholder="Continue story here!"/>
        <button className="user-input__submit">Add</button>
      </form>
      <small className="typing-notice" id="active-notice"><span className="typing-notice__number" id="active-authors"></span> authors are typing</small>
    </footer>
  );
};

export default StoryInput;