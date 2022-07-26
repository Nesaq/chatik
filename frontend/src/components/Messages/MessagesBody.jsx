import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChannelId } from '../../store/channelsSlice.js';
import { getAllMessages } from '../../store/messagesSlice.js';

const Message = ({
  username,
  body,
}) => (
  <div className="text-break mb-2">
    <b>
      {username}
    </b>

    {': '}

    {body}
  </div>
);

const MessagesBody = () => {
  const scrollForMessages = useRef(null);
  const currentChannelId = useSelector(getCurrentChannelId);
  const allMessages = useSelector(getAllMessages);
  const channelMessages = allMessages.filter(({ channelId }) => channelId === currentChannelId);

  useEffect(() => {
    scrollForMessages.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [channelMessages]);

  return (
    <div
      className="chat-messages overflow-auto px-5 "
      id="messages-box"
    >
      {channelMessages ? channelMessages.map((m) => (
        <Message
          body={m.body}
          key={m.id}
          username={m.username}
        />
      )) : null}

      <span ref={scrollForMessages} />
    </div>
  );
};
export default MessagesBody;
