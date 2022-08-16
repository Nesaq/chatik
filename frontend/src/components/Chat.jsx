import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';
import Channels from './Channels.jsx';
import Messages from './Messages/Messages.jsx';
import { actions as channelsActions } from '../store/channelsSlice.js';
import { actions as messagesActions } from '../store/messagesSlice.js';
import getModal from './Modals/index.js';

const Chat = () => {
  const [item, setItem] = useState(null);
  const [typeOfModal, setTypeOfModal] = useState(null);

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

  const showModal = (type, id = null) => {
    setTypeOfModal(type);
    setItem(id);
  };

  const hideModal = () => {
    setTypeOfModal(null);
    setItem(null);
  };

  const renderModal = (type, hide, id) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal onHide={hide} id={id} />;
  };

  return (
        <Container className='h-100 my-4 overflow-hidden rounded shadow'>
            <Row className='h-100 bg-white'>
              <Channels showModal={showModal}/>
              <Messages />
            </Row>
            {renderModal(typeOfModal, hideModal, item)}
        </Container>
  );
};

export default Chat;
