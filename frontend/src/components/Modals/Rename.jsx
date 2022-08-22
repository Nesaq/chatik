import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { selectors as channelsSelectors } from '../../store/channelsSlice.js';
import useSocket from '../../hooks/useSocket.js';
import { closeModal } from '../../store/modalsSlice.js';

const RenameModal = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { renameChannel } = useSocket();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector((state) => state.modalsReducer.item);

  const modalRenameValidation = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('modals.modalConstraints'))
      .max(20, t('modals.modalConstraints'))
      .notOneOf(channels.map((channel) => channel.name), t('modals.mustBeUnique'))
      .required(t('modals.required')),
  });

  const responseCheck = (response) => {
    if (response.status === 'ok') {
      toast.success(t('channels.renamed'), {
        position: 'top-right',
      });
      dispatch(closeModal());
    } else {
      toast.error(t('networkError'), {
        position: 'top-right',
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: modalRenameValidation,
    onSubmit: (values) => {
      const { name } = values;
      renameChannel({
        id: currentChannel.id,
        name,
      }, responseCheck);
    },
  });

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  return (
      <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(closeModal())}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              id='name'
              name='name'
              className='mb-2'
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
              />
              <Form.Label htmlFor='name' className='visually-hidden'>{t('modals.channelName')}</Form.Label>
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant='secondary' type='button' onClick={() => dispatch(closeModal())} className='me-2'>{t('modals.cancel')}</Button>
            <Button type='submit' variant='primary'>{t('modals.submit')}</Button>
          </div>
        </Form>
      </Modal.Body>
  </Modal>
  );
};

export default RenameModal;
