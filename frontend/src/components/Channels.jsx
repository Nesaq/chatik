/* eslint-disable import/no-duplicates */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { PlusSquare } from 'react-bootstrap-icons';
import {
  Nav, Col, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { selectors as channelsSelectors } from '../store/channelsSlice.js';
import { actions as channelsActions } from '../store/channelsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  //  {id: 1, name: 'general', removable: false}
  //  {id: 2, name: 'random', removable: false}
  console.log('channels', channels);
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  console.log('currentChannelId', currentChannelId); // Number 1

  const channelsRender = () => {
    const handleClick = (id) => {
      dispatch(channelsActions.setCurrentChannelId(id));
    };

    return (
      <Nav as='ul' variant='pills' fill className='flex-column px-2'>
        {channels.map((channel) => (
          <Nav.Item as='li' key={channel.id} className='w-100'>
            <Dropdown as={ButtonGroup} className='w-100'>
              <button
              type="button"
              onClick={() => handleClick(channel.id)}
              className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
                'btn-secondary': channel.id === currentChannelId,
              })}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
            <Dropdown.Toggle
              split
              variant={channel.id === currentChannelId ? 'secondary' : null}
              className='w-100 rounded-0 text-start'
            >
             <span className='visually-hidden'>Доп</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Удалить</Dropdown.Item>
              <Dropdown.Item>Переименовать</Dropdown.Item>
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
        <span>Каналы</span>
        <Button type="button" className="p-0 text-primary btn btn-group-vertical">
            <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      {channelsRender()}
    </Col>
  );
};
export default Channels;

// import React from 'react';
// import { useSelector } from 'react-redux';

// import { selectors } from '../store/channelsSlice.js';

// const Channels = () => {
//   const channels = useSelector(selectors.selectAll);

//   return (
//       <nav className="navbar w-25">
//         <div className="mt-3">
//           <ul className="list-group">
//             {channels.map((channel) => (
//               <li key={channel.id} className="list-group-item">
//                 <h3 key={channel.id}>{channel.name}</h3>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>
//   );
// };

// export default Channels;
