import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Journal from './components/Journal';

export default (
  <Route handler={App}>
    <Route path='/' handler={Journal} />
  </Route>
);
