import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './components/App.jsx';
// import store from './store/index.js';
import init from './init.js';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init();
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
