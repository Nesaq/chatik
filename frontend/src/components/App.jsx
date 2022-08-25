import React, {
  useState,
} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,

} from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { actions as messagesActions } from '../store/messagesSlice.js';
// import { actions as channelsActions } from '../store/channelsSlice.js';
// import ApiContext from '../context/apiContext.js';
import NotFoundPage from './NotFoundPage.jsx';
import Login from './Login.jsx';
import AuthContext from '../context/index.js';
import useAuth from '../hooks/index.js';
import Chat from './Chat.jsx';
import NavBar from './Nav.jsx';
import SignupPage from './Registration.jsx';

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log('currentUser', currentUser);
  // eslint-disable-next-line max-len
  const [loggedIn, setLoggedIn] = useState(currentUser ? { username: currentUser.username } : null);

  const getAuthHeader = () => {
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  };

  const logIn = (data) => {
    console.log('logIN DATA', data);
    localStorage.setItem('user', JSON.stringify(data));
    setLoggedIn({ username: data.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

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
  <AuthProvider>
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
  </AuthProvider>
);

export default App;
