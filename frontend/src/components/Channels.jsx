/* eslint-disable react/prop-types */
/* eslint-disable import/no-duplicates */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { PlusSquare } from 'react-bootstrap-icons';
import {
  Nav, Col, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getChannels, getCurrentChannelId } from '../store/selectors.js';

import { actions as channelsActions } from '../store/channelsSlice.js';
import { openModal } from '../store/modalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const currentChannelId = useSelector(getCurrentChannelId);
  const modalHandlerAdd = () => {
    dispatch(openModal({
      type: 'adding',
      channelProps: null,
      show: true,
    }));
  };

  const channelsRender = () => {
    const handleClick = (id) => {
      dispatch(channelsActions.setCurrentChannelId(id));
    };

    return (
      <Nav
        as="ul"
        className="d-flex flex-column px-2"
        fill
        variant="pills"
      >
        {channels.map((channel) => (
          <Nav.Item
            as="li"
            className="w-100"
            key={channel.id}
          >
            <Dropdown
              as={ButtonGroup}
              className="w-100"
            >
              <button
                className={cn('w-100', 'text-truncate', 'rounded-0', 'text-start', 'btn', {
                  'btn-secondary': channel.id === currentChannelId,
                })}
                onClick={() => handleClick(channel.id)}
                type="button"
              >
                <span className="me-1">
                  #
                </span>

                {channel.name}
              </button>

              { channel.removable ? (
                <Dropdown.Toggle
                  className="text-start flex-grow-0"
                  split
                  variant={channel.id === currentChannelId ? 'secondary' : null}
                >
                  <span className="visually-hidden">
                    {t('channels.menu')}
                  </span>
                </Dropdown.Toggle>
              ) : null }

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatch(openModal({ type: 'removing', channelProps: channel, show: true }))}>
                  {t('channels.remove')}
                </Dropdown.Item>

                <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renaming', channelProps: channel, show: true }))}>
                  {t('channels.rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        ))}
      </Nav>
    );
  };

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>
          {t('channels.channels')}
        </span>

        <Button
          className="p-0 text-primary btn-group-vertical"
          onClick={modalHandlerAdd}
          type="button"
          variant="link"
        >
          <PlusSquare />

          <span className="visually-hidden">
            +
          </span>
        </Button>
      </div>

      {channelsRender()}
    </Col>
  );
};
export default Channels;
