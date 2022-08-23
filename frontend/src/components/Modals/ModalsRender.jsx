import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './index.js';

const RenderModal = () => {
  const modalInfo = useSelector((state) => state.modalsReducer.type);
  const Component = getModal(modalInfo);
  if (!Component) return null;
  return (
      <Component />
  );
};

export default RenderModal;
