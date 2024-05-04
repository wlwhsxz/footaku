import axios from "axios";
import { ObjectId } from "mongodb";
import React, { useState } from "react";
import styled from "styled-components";
import useAuthStore from "../../../../store/useAuthStore";

type InputCommentProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  postId?: String;
  _id?: ObjectId;
};

const InputComment: React.FC<InputCommentProps> = ({
  _id,
  postId,
  inputRef,
}) => {
  const [comment, setComment] = useState<string>("");
  const userId = useAuthStore((state) => state.user);

  const commentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}/comment`,
      {
        userId,
        content: comment,
        likes: [],
        _id,
      }
    );
    console.log(response);
    setComment("");
  };

  return (
    <InputCommentContainer>
      <input
        ref={inputRef}
        placeholder="Add a comment..."
        value={comment}
        onChange={commentChangeHandler}
      />
      <EmojiContainer>
        {comment && <PostButton onClick={submitHandler}>submit</PostButton>}
        <Emoji>😀</Emoji>
      </EmojiContainer>
    </InputCommentContainer>
  );
};

export default InputComment;

const InputCommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 100%;
  }
`;

const EmojiContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Emoji = styled.span`
  margin-left: 4px;
`;

const PostButton = styled.button`
  color: rgb(0, 149, 246);
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #00376b;
  }
`;
