import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';

import App from './App';
import Home from './components/Home';
import Story from './containers/Story';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="story" component={Story} />
    </Route>
  </Router>
  ),
  document.getElementById('app')
);