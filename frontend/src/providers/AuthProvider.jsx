import React, {
  useState, useMemo,
} from 'react';

import AuthContext from '../context/authContext.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(currentUser ? { username: currentUser.username } : null);

  const getAuthHeader = () => {
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  };

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setLoggedIn({ username: data.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const value = useMemo(() => ({
    loggedIn, logIn, logOut, getAuthHeader,
  }), [loggedIn, logIn, logOut, getAuthHeader]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
