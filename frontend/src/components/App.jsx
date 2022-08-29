import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NotFoundPage from './NotFoundPage.jsx';
import Login from './Login.jsx';
import useAuth from '../hooks/useAuth.js';
import Chat from './Chat.jsx';
import NavBar from './Nav.jsx';
import SignupPage from './Registration.jsx';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  return (
    loggedIn ? children : <Navigate to="/login" />
  );
};
const AuthRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  return (
    loggedIn ? <Navigate to="/" /> : children
  );
};

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Routes>
        <Route path="/signup" element={<AuthRoute><SignupPage /></AuthRoute>} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>

    <ToastContainer
      position="top-right"
    />
  </Router>
);

export default App;
