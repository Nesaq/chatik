/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import Login from './Login.jsx';
// import { AuthContext } from '../context/index.js';
// import { useAuth } from '../hooks/index.jsx';

const App = () => (
    <Router>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a href="/" className="navbar-brand">Hexlet Chat</a>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={null} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
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
