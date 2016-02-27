import React from 'react';
import { Router, IndexRoute, Route, Link } from 'react-router'

import App from 'App';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route key="notfound" path="*" component={NotFound} />
  </Route>
);
