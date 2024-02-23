import React from 'react'
import styled from 'styled-components';

const Chat = () => {
  return (
    <ChatContainer>
      <Header>
        <div>
          Footaku
        </div>
        <div>
          <img src='' />
          <span>2322</span>
        </div>
      </Header>
      <ChatBox>
        <ChatContent>

        </ChatContent>
        <UserInfoBox>
          img
          <span>
            nickname
          </span>
        </UserInfoBox>
        <input />
      </ChatBox>
    </ChatContainer>
  )
}

export default Chat;

const ChatContainer = styled.div`
  position: fixed
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;

  width: 300px;
  height: 70vh;

  background-color: black;
  color: white;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 5px;

  border: 1px solid white;
`

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;

  input {
    width: 100%;
    background-color: transparent;
    color: white;
  }
`

const ChatContent = styled.div`
  flex: 1;
  border: 1px solid white;
`

const UserInfoBox = styled.div`
  display: flex;
  padding: 5px;

  span {
    margin-left: 10px;
  }
`