import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const NavBar = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Navbar
      bg="white"
      className="shadow-sm"
      expand="lg"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
        >
          Hexlet Chat
        </Navbar.Brand>

        { auth.loggedIn ? (
          <Button
            onClick={auth.logOut}
            variant="primary"
          >
            {t('logout')}
          </Button>
        ) : null }
      </Container>
    </Navbar>
  );
};

export default NavBar;
