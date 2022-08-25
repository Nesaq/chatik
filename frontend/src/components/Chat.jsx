import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import axios from 'axios';
import { Container, Row } from 'react-bootstrap';

import useAuth from '../hooks/useAuth.js';
import Channels from './Channels.jsx';
import Messages from './Messages/Messages.jsx';
import ModalsRender from './Modals/ModalsRender.jsx';
import { fetchData } from '../store/channelsSlice.js';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({ headers: auth.getAuthHeader() }));
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <Channels />

        <Messages />

        <ModalsRender />
      </Row>
    </Container>
  );
};

export default Chat;
