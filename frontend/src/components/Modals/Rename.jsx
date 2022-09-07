import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { getChannels } from '../../store/channelsSlice.js';
import useApi from '../../hooks/useApi.js';
import { closeModal, getModalProps, getModalStatus } from '../../store/modalsSlice';

const RenameModal = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { renameChannel } = useApi();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getModalProps);
  const show = useSelector(getModalStatus);

  const modalRenameValidation = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'modals.modalConstraints')
      .max(20, 'modals.modalConstraints')
      .notOneOf(channels.map((channel) => channel.name), 'modals.mustBeUnique')
      .required('modals.required'),
  });

  const responseCheck = (response) => {
    if (response.status === 'ok') {
      toast.success(t('channels.renamed'));
      dispatch(closeModal());
    } else {
      toast.error(t('networkError'));
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
    <Modal
      centered
      show={show}
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Header
        closeButton
      >
        <Modal.Title>
          {t('modals.renameTitle')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              id="name"
              isInvalid={formik.errors.name ? formik.touched.name : null}
              name="name"
              onChange={formik.handleChange}
              ref={inputRef}
              value={formik.values.name}
            />

            <Form.Label
              className="visually-hidden"
              htmlFor="name"
            >
              {t('modals.channelName')}
            </Form.Label>

            <Form.Control.Feedback type="invalid">
              {formik.errors.name ? t(formik.errors.name) : null}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              onClick={() => dispatch(closeModal())}
              type="button"
              variant="secondary"
            >
              {t('modals.cancel')}
            </Button>

            <Button
              type="submit"
              variant="primary"
            >
              {t('modals.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
