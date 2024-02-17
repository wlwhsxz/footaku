import React, { useState } from "react";
import styled from "styled-components";

type CommentProps = {
  inputRef: React.RefObject<HTMLInputElement>;
};

const Comment: React.FC<CommentProps> = ({ inputRef }) => {
  const [comment, setComment] = useState<string>("");

  const commentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = () => {
    console.log(comment);
    setComment("");
  };

  return (
    <CommentContainer>
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
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
