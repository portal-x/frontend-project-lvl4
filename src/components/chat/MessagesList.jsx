import { Col } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentChannelID, selectMssages } from '../../redux/chatSlise';
import Input from './Input.jsx';

const buildwordEnding = (numPosts) => {
  if (numPosts === 1) return 'е';
  if (numPosts >= 2 && numPosts <= 4) return 'я';
  return 'й';
};

export default () => {
  const messages = useSelector(selectMssages);
  const currentChanalId = useSelector(selectCurrentChannelID);
  const channelMess = messages.filter(
    (mess) => mess.chanalId === currentChanalId,
  );
  const messCount = channelMess.length;

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>#</b>
          </p>
          <span className="text-muted">
            {`${messCount} сообщени${buildwordEnding(messCount)}`}
          </span>
        </div>
        <div className="chat-messages overflow-auto px-5" id="messages-box">
          mess was here
          {channelMess.map(({ user, text }) => (
            <div className="text-break mb-2">
              <b>{user}</b>
              :
              {text}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Input />
        </div>
      </div>
    </Col>
  );
};
