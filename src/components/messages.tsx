import React from "react";

interface Message {
  member: {
    id: string;
    clientData: {
      color: string;
      username: string;
    };
  };
  text: string;
}

interface Props {
  messages: Message[];
  currentMember: {
    id: string;
  };
}

const Messages: React.FC<Props> = ({ messages, currentMember }) => {
  const renderMessage = (message: Message) => {
    const { member, text } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li className={className}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  return (
    <ul className="Messages-list">
      {messages.map((m) => renderMessage(m))}
    </ul>
  );
};

export default Messages;