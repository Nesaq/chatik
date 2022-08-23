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
import { selectors as channelsSelectors } from '../store/channelsSlice.js';
import { actions as channelsActions } from '../store/channelsSlice.js';
import { openModal } from '../store/modalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);

  const modalHandlerAdd = () => {
    dispatch(openModal({
      type: 'adding',
      item: null,
    }));
  };

  const channelsRender = () => {
    const handleClick = (id) => {
      dispatch(channelsActions.setCurrentChannelId(id));
    };

    return (
        <Nav as='ul' variant='pills' fill className='d-flex flex-column px-2'>
            {channels.map((channel) => (
                <Nav.Item as='li' key={channel.id} className='w-100'>
                    <Dropdown as={ButtonGroup} className='w-100'>
                        <button
              type="button"
              onClick={() => handleClick(channel.id)}
              className={cn('w-100', 'text-truncate', 'rounded-0', 'text-start', 'btn', {
                'btn-secondary': channel.id === currentChannelId,
              })}
            >
                            <span className="me-1">#</span>
                            {channel.name}
                        </button>
                        { channel.removable && <Dropdown.Toggle
              split
              variant={channel.id === currentChannelId ? 'secondary' : null}
              className='text-start flex-grow-0'
            >
                            <span className='visually-hidden'>{t('channels.menu')}</span>
                        </Dropdown.Toggle> }
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => dispatch(openModal({ type: 'removing', item: channel }))}>{t('channels.remove')}</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renaming', item: channel }))}>{t('channels.rename')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav.Item>
            ))}
        </Nav>
    );
  };

  return (
      <Col className='col-4 col-md-2 border-end pt-5 px-0 bg-light'>
          <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
              <span>{t('channels.channels')}</span>
              <Button type='button' onClick={modalHandlerAdd} variant='link' className='p-0 text-primary btn-group-vertical'>
                  <PlusSquare />
                  <span className='visually-hidden'>+</span>
              </Button>
          </div>
          {channelsRender()}
      </Col>
  );
};
export default Channels;
