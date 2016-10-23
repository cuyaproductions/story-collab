import React from 'react';

import Header from './Header';
import StoryList from './StoryList';


const testData = [
  {
    "id": "foo123",
    "title": "Once upon a time",
    "timestamp": 1477172179,
    "authors": [1, 2, 3, 4]
  },
  {
    "id": "bar456",
    "title": "It was a dark cloudy night",
    "timestamp": 1477172214,
    "authors": [1, 2]
  }
];

const Home = () => {
  return (
    <div>
      <Header/>
      <section className="category">
        <h2 className="category__title">Open Stories</h2>
        <StoryList stories={testData}/>
      </section>
    </div>
  );
};

export default Home;