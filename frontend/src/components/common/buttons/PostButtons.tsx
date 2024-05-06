import React from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import SaveButton from "./SaveButton";

interface PostButtonsProps {
  focusInput: () => void;
}

const PostButtons: React.FC<PostButtonsProps> = ({ focusInput }) => {
  return (
    <ButtonSection>
      <LeftButtonBox>
        <LikeButton />
        <CommentButton onCommentClick={focusInput} />
        <ShareButton />
      </LeftButtonBox>
      <RightButtonBox>
        <SaveButton />
      </RightButtonBox>
    </ButtonSection>
  );
};

export default PostButtons;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    &:hover {
      cursor: pointer;
    }
  }
`;

const LeftButtonBox = styled.div`
  display: flex;

  div {
    padding: 0 8px 8px 0;
  }
`;

const RightButtonBox = styled.div``;
