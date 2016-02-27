import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, Router, match } from 'react-router';
import routes from '../../routes';
import NotFound from 'pages/NotFound';

export default (req, res) => {
  match({
    routes: (<Router>{routes}</Router>),
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    const html = renderToString(<RouterContext {...renderProps} />);

    if(renderProps.components.some((component) => component === NotFound)) {
      res.status(404);
    }

    res.render('index.ejs', {
      html
    })
  });
};
