import React, {Component} from 'react';
import axios from 'axios';

import Header from '../components/Header';
import StoryList from '../components/StoryList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: []
    }
  }

  componentDidMount() {
    axios.get('/api/story')
      .then((response) => {
        this.setState({
          stories: response.data.stories
        });
      });
  }

  render() {
    return (
      <div>
        <Header/>
        <section className="category">
          <h2 className="category__title">Open Stories</h2>
          <StoryList stories={this.state.stories}/>
        </section>
      </div>
    );
  }
};

export default Home;