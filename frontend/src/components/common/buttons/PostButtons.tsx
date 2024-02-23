import React from 'react'
import styled from 'styled-components';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import SaveButton from './SaveButton';

interface PostButtonsProps {
  focusInput: () => void;
}

const PostButtons: React.FC<PostButtonsProps> = ({ focusInput }) => {
  return (
    <div>
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
  </div>
  )
}

export default PostButtons;




const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  img {
    &:hover {
      cursor: pointer;
    }
  }
`;

const LeftButtonBox = styled.div`
  display: flex;

  div {
    padding: 8px;
  }
`;

const RightButtonBox = styled.div`
  div {
    padding: 8px;
  }
`;
