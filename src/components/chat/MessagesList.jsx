import { Col } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';

import { addMessages, selectChanels, selectCurrentChannelID, selectMssages } from '../../redux/chatSlise';
import Input from './Input.jsx';
import { UseSocket } from '../../context/SocketContext.jsx';

const buildwordEnding = (numPosts) => {
  if (numPosts === 1) return 'е';
  if (numPosts >= 2 && numPosts <= 4) return 'я';
  return 'й';
};

export default () => {
  console.log('messagessList render...');
  const messages = useSelector(selectMssages);
  const currentChanalId = useSelector(selectCurrentChannelID);
  const channels = useSelector(selectChanels);

  const { name: currentChan } = channels.find(({ id }) => id === currentChanalId);
  const channelMess = messages.filter(
    (mess) => mess.chanalId === currentChanalId,
  );
  const messCount = channelMess.length;

  // const dispatch = useDispatch();
  // const socket = UseSocket();
  // const sendMess = (mess) => {
  //   console.log('новое сообщение:', mess);
  //   dispatch(addMessages(mess));
  // };

  // socket.on('newMessage', sendMess);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              &nbsp;
              {currentChan}
            </b>
          </p>
          <span className="text-muted">
            {`${messCount} сообщени${buildwordEnding(messCount)}`}
          </span>
        </div>
        <div className="chat-messages overflow-auto px-5" id="messages-box">
          {channelMess.map(({ user, text }) => (
            <div className="text-break mb-2" key={uniqueId()}>
              <b>{user}</b>
              :
              &nbsp;
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
