import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ApiContext from '../context/apiContext.js';
import { actions as messagesActions } from '../store/messagesSlice.js';
import { actions as channelsActions } from '../store/channelsSlice.js';

// eslint-disable-next-line react/prop-types
const ApiProvider = ({ children, socket }) => {
  const dispatch = useDispatch();
  const addMessage = (message, connectionStatus) => {
    socket.emit('newMessage', message, (response) => {
      connectionStatus(response);
    });
  };

  const addChannel = (channel, connectionStatus) => {
    socket.emit('newChannel', channel, (response) => {
      connectionStatus(response);
    });
  };

  const renameChannel = (channel, connectionStatus) => {
    socket.emit('renameChannel', channel, (response) => {
      connectionStatus(response);
    });
  };

  const removeChannel = (channel, connectionStatus) => {
    socket.emit('removeChannel', channel, (response) => {
      connectionStatus(response);
    });
  };

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(channelsActions.renameChannel({
        id: channel.id,
        changes: { name: channel.name },
      }));
    });

    socket.on('removeChannel', (channel) => {
      dispatch(channelsActions.removeChannel(channel.id));
    });
  }, [dispatch, socket]);

  // const value = useMemo(())
  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ApiContext.Provider value={{
      addMessage, addChannel, renameChannel, removeChannel,
    }}
    >
      { children }
    </ApiContext.Provider>
  );
};

export default ApiProvider;
