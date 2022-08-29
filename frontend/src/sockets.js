import store from './store/index.js';

import { actions as channelsActions } from './store/channelsSlice.js';
import { actions as messagesActions } from './store/messagesSlice';

const initSocket = (socket) => {
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

  socket.on('newMessage', (message) => {
    store.dispatch(messagesActions.addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(channelsActions.renameChannel({
      id: channel.id,
      changes: { name: channel.name },
    }));
  });

  socket.on('removeChannel', (channel) => {
    store.dispatch(channelsActions.removeChannel(channel.id));
  });

  return {
    addMessage,
    addChannel,
    renameChannel,
    removeChannel,
  };
};

export default initSocket;
