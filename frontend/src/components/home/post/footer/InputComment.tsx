import axios from "axios";
import { ObjectId } from "mongodb";
import React, { useState } from "react";
import styled from "styled-components";
import useAuthStore from "../../../../store/useAuthStore";
import { NewComment } from "../../../../types";

type InputCommentProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  _id: ObjectId;
  postId: string;
  addComment: (newComment: NewComment) => void;
};

const InputComment: React.FC<InputCommentProps> = ({
  _id,
  postId,
  inputRef,
  addComment,
}) => {
  const [comment, setComment] = useState<string>("");
  const userId = useAuthStore((state) => state.user);

  const commentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = async () => {
    if (!userId) {
      console.error("User is not logged in!");
      return;
    }

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}/comment`,
      {
        _id,
        userId,
        content: comment,
        likes: [],
      }
    );
    console.log("inputComment response", response);

    const user = localStorage.getItem("user");
    const userObject = user ? JSON.parse(user) : null;

    if (!userObject) {
      console.error("User information is not available in local storage!");
      return;
    }

    const newComment: NewComment = {
      _id: response.data.data._id,
      postId,
      userId: userObject.userId,
      text: comment,
      userName: userObject.name,
      profileImg: userObject.profileImg,
      updatedAt: new Date(),
      createdAt: new Date(),
      createdBy: {
        userId: userObject.userId,
        profileImg: userObject.profileImg,
      },
      likes: [],
    };

    console.log("newComment - ", newComment);

    addComment(newComment);
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
