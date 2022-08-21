import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectros } from '../../store/channelsSlice.js';
import { selectors as messagesSelectors } from '../../store/messagesSlice.js';

const MessagesHeader = () => {
  const channels = useSelector(channelsSelectros.selectAll);
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const allMessages = useSelector(messagesSelectors.selectAll);
  const channelMessages = allMessages.filter(({ channelId }) => channelId === currentChannelId);

  return (
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className='m-0'>
          <b>
            {'# '}
            {currentChannel ? currentChannel.name : null }
          </b>
        </p>
        <span className='text-muted'>{channelMessages.length} сообщений</span>
      </div>
  );
};
export default MessagesHeader;
