import React, {
  useState,
} from 'react';

import AuthContext from '../context/authContext.js';

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

  // const value = useMemo(() => ({
  //   loggedIn, logIn, logOut, getAuthHeader,
  // }), [loggedIn, logIn, logOut, getAuthHeader]);

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

export default AuthProvider;
