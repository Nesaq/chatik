import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { selectors as channelsSelectors } from '../../store/channelsSlice.js';
import useSocket from '../../hooks/useSocket.js';
import { closeModal } from '../../store/modalsSlice.js';

const RenameModal = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { renameChannel } = useSocket();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector((state) => state.modalsReducer.itemId);
  console.log('ModalsReducer', currentChannel);

  const modalRenameValidation = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channels.map((channel) => channel.name), 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const responseCheck = (response) => {
    if (response.status === 'ok') {
      console.log('good connection');
      dispatch(closeModal());
    } else {
      console.log('bad connection');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: modalRenameValidation,
    onSubmit: (values) => {
      console.log('valuesRanameChannels', values);
      const { channelName } = values.name;
      renameChannel({
        id: currentChannel.id,
        name: channelName,
      }, responseCheck);
    },
  });

  useEffect(() => {
    inputRef.current.select();
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
              name='name'
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

export default RenameModal;
