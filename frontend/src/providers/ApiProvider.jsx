/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useMemo } from 'react';
import ApiContext from '../context/apiContext';

const ApiProvider = ({ socket, children }) => {
  const {
    addMessage,
    addChannel,
    renameChannel,
    removeChannel,
  } = socket;

  const value = useMemo(() => ({
    addMessage,
    addChannel,
    renameChannel,
    removeChannel,
  }), [addMessage, addChannel, renameChannel, removeChannel]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
