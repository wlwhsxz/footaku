import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputField from "./InputField";
import socket from "../../server";
import ChatContent from "./ChatContent";

const Chat = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log("MessageList :", messageList);

  useEffect(() => {
    socket.on("message", (message: any) => {
      setMessageList((prev) => prev.concat(message));
    });
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("sendMessage", message, (res: any) => {
      console.log("Res :", res);
    });
    setMessage("");
  };

  return (
    <ChatContainer>
      <Header>
        <div>Footaku</div>
        <div>
          <img src="" />
          <span>2322</span>
        </div>
      </Header>
      <ChatBox>
        <ChatContent messageList={messageList} user={user} />
        <UserInfoBox>
          img
          <span>nickname</span>
        </UserInfoBox>
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </ChatBox>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;

  width: 300px;
  height: 70vh;

  margin-top: 105px;

  background-color: black;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 5px;

  border: 1px solid white;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
`;

const UserInfoBox = styled.div`
  display: flex;
  padding: 5px;

  span {
    margin-left: 10px;
  }
`;
