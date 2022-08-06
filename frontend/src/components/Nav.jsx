import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import useAuth from '../hooks/index.js';

const NavBar = () => {
  const auth = useAuth();

  return (
        <Navbar className='shadow-sm' bg='white'>
            <Container>
                <Navbar.Brand href='/'>Chat</Navbar.Brand>
                { auth.loggedIn ? <Button variant="primary" onClick={auth.logOut}>Выход</Button> : null }
            </Container>
        </Navbar>
  );
};

export default NavBar;
