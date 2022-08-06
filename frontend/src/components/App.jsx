/* eslint-disable react/react-in-jsx-scope */
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,

} from 'react-router-dom';
// import { Button } from 'react-bootstrap';
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

  // const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line max-len
  const [loggedIn, setLoggedIn] = useState(currentUser ? { username: currentUser.username } : null);

  console.log('loggedIn', loggedIn);
  // console.log('setLoggedIn', setLoggedIn);

  // const logIn = () => setLoggedIn(true);
  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('userId'));
    console.log('USERID', user);
    if (user && user.token) {
      console.log('TOKEN', user.token);
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
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

// const App = () => (
//   <AuthProvider>
//     <Router>
//       <div className="d-flex flex-column h-100">
//         <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
//           <div className="container">
//             <a href="/" className="navbar-brand">Chat</a>
//           </div>
//         </nav>
//         <Routes>
//           <Route path='/' element={<PrivateRoute>< Chat /></PrivateRoute>} />
//           <Route path='/login' element={<Login />} />
//           <Route path='*' element={<NotFoundPage />} />
//         </Routes>
//       </div>
//     </Router>
//    </AuthProvider>
// );

const App = () => (
  <AuthProvider>
    <Router>
    <div className="d-flex flex-column h-100">
      <NavBar />
    <Routes>
         <Route path='/' element={<PrivateRoute>< Chat /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </div>
    </Router>
  </AuthProvider>
);

export default App;

// const App = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   </BrowserRouter>
