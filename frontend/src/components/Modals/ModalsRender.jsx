import React from 'react';
import { useSelector } from 'react-redux';

import getModal from './index.js';
import { getModalInfo } from '../../store/modalsSlice.js';

const RenderModal = () => {
  const modalInfo = useSelector(getModalInfo);
  const Component = getModal(modalInfo);
  if (!Component) return null;
  return (
    <Component />
  );
};

export default RenderModal;
