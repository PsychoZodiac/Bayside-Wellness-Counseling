import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

export function render(path) {
  const helmetContext = {};
  const html = ReactDOMServer.renderToString(
    React.createElement(
      HelmetProvider,
      { context: helmetContext },
      React.createElement(
        StaticRouter,
        { location: path },
        React.createElement(App)
      )
    )
  );
  return { html, helmet: helmetContext.helmet };
}
