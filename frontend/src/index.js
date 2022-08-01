import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';

const root = ReactDOM.createroot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// ReactDOM.render(
// <BrowserRouter>
// <App />
// </BrowserRouter>,
// document.getElementById('root'),
// );
