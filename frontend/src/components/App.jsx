import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,

} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NotFoundPage from './NotFoundPage.jsx';
import Login from './Login.jsx';
import useAuth from '../hooks/useAuth.js';
import Chat from './Chat.jsx';
import NavBar from './Nav.jsx';
import SignupPage from './Registration.jsx';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : (
      <Navigate
        state={{ from: location }}
        to="/login"
      />
    )
  );
};

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <NavBar />

      <Routes>
        <Route
          element={(
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
)}
          path="/"
        />

        <Route
          element={<Login />}
          path="/login"
        />

        <Route
          element={<NotFoundPage />}
          path="*"
        />

        <Route
          element={<SignupPage />}
          path="/signup"
        />
      </Routes>
    </div>

    <ToastContainer />
  </Router>
);

export default App;
