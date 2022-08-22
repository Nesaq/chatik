import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { closeModal } from '../../store/modalsSlice.js';
import useSocket from '../../hooks/useSocket.js';

const Remove = () => {
  const { t } = useTranslation();

  const { removeChannel } = useSocket();
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.modalsReducer.item);
  console.log('currentChannelREMOVE', currentChannel);

  const responseCheck = (response) => {
    if (response.status === 'ok') {
      console.log('good connection');
      dispatch(closeModal());
    } else {
      console.log('bad connection');
    }
  };

  const deleteChannel = (e) => {
    e.preventDefault();
    removeChannel(currentChannel, responseCheck);
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={() => dispatch(closeModal())}>
        <Modal.Title>{t('modals.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className='lead'>{t('modals.deleteChannel')}</span>
        </Modal.Body>
      <Modal.Footer>
        <Form onSubmit={deleteChannel}>
          <div className="d-flex justify-content-end">
            <Button type="button" variant="secondary" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
            <Button type="submit" variant="danger" className="mx-2">{t('modals.remove')}</Button>
          </div>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
