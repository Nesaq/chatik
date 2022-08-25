/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { selectors as channelsSelectors } from '../../store/channelsSlice.js';
import { actions as channelsActions } from '../../store/channelsSlice.js';
import { closeModal } from '../../store/modalsSlice.js';
import useApi from '../../hooks/useApi.js';

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { addChannel } = useApi();

  const channels = useSelector(channelsSelectors.selectAll);

  const modalAddValidation = yup.object().shape({
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
      toast.success(t('channels.created'), {
        position: 'top-right',
      });
      const { id } = response.data;
      dispatch(channelsActions.setCurrentChannelId(id));
      dispatch(closeModal());
    } else {
      toast.error(t('networkError'), {
        position: 'top-right',
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: modalAddValidation,
    onSubmit: (values) => {
      const { name } = values;
      addChannel({ name }, responseCheck);
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
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
          {t('modals.addChannel')}
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

export default Add;
