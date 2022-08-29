import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// import { selectors as channelsSelectros } from '../../store/channelsSlice.js';
// import { selectors as messagesSelectors } from '../../store/messagesSlice.js';
import { getChannels, getAllMessages, getCurrentChannelId } from '../../store/selectors.js';

const MessagesHeader = () => {
  const { t } = useTranslation();

  const channels = useSelector(getChannels);
  const allMessages = useSelector(getAllMessages);
  const currentChannelId = useSelector(getCurrentChannelId);

  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const channelMessages = allMessages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {'# '}

          {currentChannel ? currentChannel.name : null }
        </b>
      </p>

      <span className="text-muted">
        {t('messages.count.messages', { count: channelMessages.length })}
      </span>
    </div>
  );
};
export default MessagesHeader;
