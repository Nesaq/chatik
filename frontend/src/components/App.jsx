import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NotFoundPage from './NotFoundPage.jsx';
import Login from './Login.jsx';
import useAuth from '../hooks/useAuth.js';
import Chat from './Chat.jsx';
import NavBar from './Nav.jsx';
import SignupPage from './Registration.jsx';

const PrivateOutlet = ({ chatPage } = false) => {
  const { loggedIn } = useAuth();

  if (chatPage) {
    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
  }
  return loggedIn ? <Navigate to="/" /> : <Outlet />;
};

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Routes>
        <Route path="/signup" element={<PrivateOutlet />}>
          <Route path="" element={<SignupPage />} />
        </Route>
        <Route path="/login" element={<PrivateOutlet />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateOutlet chatPage />}>
          <Route path="" element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>

    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={2}
      theme="dark"
      transition={Zoom}
    />
  </Router>
);

export default App;
