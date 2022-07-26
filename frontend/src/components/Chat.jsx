import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth.js';
import Channels from './Channels.jsx';
import Messages from './Messages/Messages.jsx';
import ModalsRender from './Modals/ModalsRender.jsx';
import { fetchData, getFetchStatus } from '../store/channelsSlice.js';

const Chat = () => {
  const { t } = useTranslation();

  const auth = useAuth();
  const dispatch = useDispatch();
  const isSpinnerOn = useSelector(getFetchStatus);

  useEffect(() => {
    dispatch(fetchData({ headers: auth.getAuthHeader() }));
  }, [dispatch, auth]);

  return isSpinnerOn
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner variant="warning" animation="border" role="status">
          <span className="visually-hidden">{t('loadigNetwork')}</span>
        </Spinner>
      </div>
    )
    : (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">
          <Channels />

          <Messages />

          <ModalsRender />
        </Row>
      </Container>
    );
};

export default Chat;
