/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { selectors as channelsSelectors } from '../../store/channelsSlice.js';
import { actions as channelsActions } from '../../store/channelsSlice.js';
import useSocket from '../../hooks/useSocket.js';
import { closeModal } from '../../store/modalsSlice.js';

const Add = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { addChannel } = useSocket();

  const channels = useSelector(channelsSelectors.selectAll);
  const channelsName = channels.map((channel) => channel.name);
  console.log(channelsName);
  console.log('channelsADDMODAL', channels);

  const modalAddValidation = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channels.map((channel) => channel.name), 'Должно быть уникальным')
      .required('Обязательное поеле'),
  });

  const responseCheck = (response) => {
    if (response.status === 'ok') {
      const { id } = response.data;
      console.log('EMMIT ID', id);
      dispatch(channelsActions.setCurrentChannelId(id));
      dispatch(closeModal());
    } else {
      console.log(`${response.status} bad connection`);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    modalAddValidation,
    onSubmit: (values) => {
      console.log('valuesADDCHANNELS', values);
      const { name } = values;
      addChannel({ name }, responseCheck);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
        <Modal show>
          <Modal.Header closeButton onHide={() => dispatch(closeModal())}>
            <Modal.Title>Добавить канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Control
                  name='name'
                  id='name'
                  className='mb-2'
                  ref={inputRef}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  isInvalid={formik.errors.name && formik.touched.name}
                  />
                  <Form.Label htmlFor='name' className='visually-hidden'>Имя канала</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
              </Form.Group>
              <div className='d-flex justify-content-end'>
                <Button variant='secondary' type='button' onClick={() => dispatch(closeModal())} className='me-2'>Отменить</Button>
                <Button type='submit' variant='primary'>Отправить</Button>
              </div>
            </Form>
          </Modal.Body>
      </Modal>
  );
};

export default Add;
