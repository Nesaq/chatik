import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';

import useAuth from '../hooks/index.js';
import routes from '../routes.js';
import Channels from './Channels.jsx';
import Messages from './Messages/Messages.jsx';
import ModalsRender from './Modals/ModalsRender.jsx';
import { actions as channelsActions } from '../store/channelsSlice.js';
import { actions as messagesActions } from '../store/messagesSlice.js';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
      const { channels, currentChannelId, messages } = data;
      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  }, [dispatch, auth]);

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
