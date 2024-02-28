import React from "react";
import styled from "styled-components";

interface ChatContentProps {
  messageList: any[];
  user: any;
}

const ChatContent: React.FC<ChatContentProps> = ({ messageList, user }) => {
  return (
    <ChatContentContainer>
      {messageList.map((message) => {
        return (
          <div>
            <span>{message.chat}</span>
          </div>
        );
      })}
    </ChatContentContainer>
  );
};

export default ChatContent;

const ChatContentContainer = styled.div`
  flex: 1;
  border: 1px solid white;
`;
