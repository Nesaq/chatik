/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,

} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { actions as messagesActions } from '../store/messagesSlice.js';
import { actions as channelsActions } from '../store/channelsSlice.js';
import ApiContext from '../context/apiContext.js';
import NotFoundPage from './NotFoundPage.jsx';
import Login from './Login.jsx';
import AuthContext from '../context/index.js';
import useAuth from '../hooks/index.js';
import Chat from './Chat.jsx';
import NavBar from './Nav.jsx';

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  // console.log(children);
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  console.log('currentUser', currentUser);
  // eslint-disable-next-line max-len
  const [loggedIn, setLoggedIn] = useState(currentUser ? { username: currentUser.username } : null);

  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('userId'));
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };

  const logIn = (data) => {
    console.log('logIN DATA', data);
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn({ username: data.username });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getAuthHeader,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react/prop-types
const SocketIoProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

  const addMessage = (message, connectionStatus) => {
    socket.emit('newMessage', message, (response) => {
      connectionStatus(response);
    });
  };

  const addChannel = (channel, connectionStatus) => {
    socket.emit('newChannel', channel, (response) => {
      connectionStatus(response);
    });
  };

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
    });
  }, []);

  return (
    <ApiContext.Provider value={{ addMessage, addChannel }}>
      { children }
    </ApiContext.Provider>
  );
};

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <SocketIoProvider>
  <AuthProvider>
    <Router>
    <div className="d-flex flex-column h-100">
      <NavBar />
    <Routes>
          <Route path='/' element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFoundPage />} />
    </Routes>
    </div>
    </Router>
  </AuthProvider>
  </SocketIoProvider>
);

export default App;
