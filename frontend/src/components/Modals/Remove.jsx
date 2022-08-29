import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

// import { closeModal } from '../../store/modalsSlice.js';
import useApi from '../../hooks/useApi.js';
// import { getModalProps, getModalStatus } from '../../store/selectors.js';
import { closeModal, getModalProps, getModalStatus } from '../../store/modalsSlice.js';

const Remove = () => {
  const { t } = useTranslation();

  const { removeChannel } = useApi();
  const dispatch = useDispatch();
  const currentChannel = useSelector(getModalProps);
  const show = useSelector(getModalStatus);

  const responseCheck = (response) => {
    if (response.status === 'ok') {
      toast.success(t('channels.removed'), {
        position: 'top-right',
      });
      dispatch(closeModal());
    } else {
      toast.error(t('networkError'), {
        position: 'top-right',
      });
    }
  };

  const deleteChannel = (e) => {
    e.preventDefault();
    removeChannel(currentChannel, responseCheck);
  };

  return (
    <Modal
      centered
      show={show}
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Header
        closeButton
      >
        <Modal.Title>
          {t('modals.title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <span className="lead">
          {t('modals.deleteChannel')}
        </span>
      </Modal.Body>

      <Modal.Footer>
        <Form onSubmit={deleteChannel}>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => dispatch(closeModal())}
              type="button"
              variant="secondary"
            >
              {t('modals.cancel')}
            </Button>

            <Button
              className="mx-2"
              type="submit"
              variant="danger"
            >
              {t('modals.remove')}
            </Button>
          </div>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
