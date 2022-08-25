import React, {
  useState, useMemo, useCallback,
} from 'react';

import AuthContext from '../context/index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log('currentUser', currentUser);
  // eslint-disable-next-line max-len
  const [loggedIn, setLoggedIn] = useState(currentUser ? { username: currentUser.username } : null);

  const getAuthHeader = useCallback(() => {
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  }, []);

  const logIn = useCallback((data) => {
    console.log('logIN DATA', data);
    localStorage.setItem('user', JSON.stringify(data));
    setLoggedIn({ username: data.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  }, []);

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
