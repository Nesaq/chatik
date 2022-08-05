/* eslint-disable react/react-in-jsx-scope */
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

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  // console.log(children);

  const currentUser = JSON.parse(localStorage.getItem('userId'));
  console.log(currentUser);

  // const [loggedIn, setLoggedIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
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

// const AuthButton = () => {
//   const auth = useAuth();
//   const location = useLocation();

//   return (
//     auth.loggedIn
//       ? <Button onClick={auth.logOut}>Log out</Button>
//       : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
//   );
// };

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a href="/" className="navbar-brand">Chat</a>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<PrivateRoute>{null}</PrivateRoute>} />
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
