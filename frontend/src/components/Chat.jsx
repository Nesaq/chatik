import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';
import Channels from './Channels.jsx';
import Messages from './Messages/Messages.jsx';
import { actions as channelsActions } from '../store/channelsSlice.js';
import { actions as messagesActions } from '../store/messagesSlice.js';
import ModalsRender from './Modals/ModalsRender.jsx';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
      console.log(data); // channels, currentChannelId, messages
      const { channels, currentChannelId, messages } = data;
      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  }, []);

  return (
        <Container className='h-100 my-4 overflow-hidden rounded shadow'>
            <Row className='h-100 bg-white'>
              <Channels />
              <Messages />
              <ModalsRender />
            </Row>
        </Container>
  );
};

export default Chat;
