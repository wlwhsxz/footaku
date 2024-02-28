import React from "react";
import styled from "styled-components";

const InputField = ({ message, setMessage, sendMessage }: any) => {
  return (
    <InputFieldContainer>
      <InputForm onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiple={false}
          placeholder="type your messages"
        />
        <button disabled={message === ""} type="submit">
          Send
        </button>
      </InputForm>
    </InputFieldContainer>
  );
};

export default InputField;

const InputFieldContainer = styled.div``;

const InputForm = styled.form`
  display: flex;

  input {
    width: 100%;
    background-color: transparent;
    color: white;
  }
`;
