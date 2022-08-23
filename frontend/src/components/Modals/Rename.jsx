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
    <Modal
      centered
      show
    >
      <Modal.Header
        closeButton
        onHide={() => dispatch(closeModal())}
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
              {formik.errors.name}
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
