import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.js';

const NavBar = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
        <Navbar className='shadow-sm' bg='white' expand='lg'>
            <Container>
                <Navbar.Brand href='/'>Chat</Navbar.Brand>
                { auth.loggedIn ? <Button variant="primary" onClick={auth.logOut}>{t('logout')}</Button> : null }
            </Container>
        </Navbar>
  );
};

export default NavBar;
