import React from 'react';

const MessagesList = ({ messages, id }) => {
  return (
    <ul style={{ "color": "green" }}>
      {messages.map((message, idx) => <li key={`message-${idx}_${id}`}>{message}</li>)}
    </ul>
  );
};

export default MessagesList;
