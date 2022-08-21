/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../../store/messagesSlice.js';

const Message = ({
  username,
  body,
}) => (
    <div className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {body}
    </div>
);

const MessagesBody = () => {
  const scrollForMessages = useRef(null);
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const allMessages = useSelector(messagesSelectors.selectAll);
  const channelMessages = allMessages.filter(({ channelId }) => channelId === currentChannelId);

  useEffect(() => {
    scrollForMessages.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [channelMessages]);

  console.log('channelMessages', channelMessages);
  return (
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {channelMessages && channelMessages.map((m) => (
          <Message username={m.username} body={m.body} key={m.id} />
        ))}
        <span ref={scrollForMessages}></span>
      </div>
  );
};
export default MessagesBody;
