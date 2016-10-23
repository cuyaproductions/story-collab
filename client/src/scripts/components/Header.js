import React from 'react';
import {Link} from 'react-router';

const Header = () => {
  return (
    <header className="header">
      <Link to={'/story'} className="create__button">Start a story</Link>
      <h1 className="logo">StoryCollab!</h1>
    </header>
  );
}

export default Header;