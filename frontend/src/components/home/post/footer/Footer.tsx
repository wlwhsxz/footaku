import styled from "styled-components";

import { useRef } from "react";
import Comment from "./Comment";
import CommentButton from "../../../common/buttons/CommentButton";
import LikeButton from "../../../common/buttons/LikeButton";
import ShareButton from "../../../common/buttons/ShareButton";
import SaveButton from "../../../common/buttons/SaveButton";
import { Comments } from "../../../../types/index";

interface FooterProps {
  comments: Comments[];
  summary: string;
}

const Footer: React.FC<FooterProps> = ({ summary, comments }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <FooterContainer>
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
      <TextSection>
        <LikeText>3,654,321 likes</LikeText>
        <TitleText>{summary}</TitleText>
        <CommentText>
          view all 4,219 comments
          <Comment inputRef={inputRef} />
        </CommentText>
      </TextSection>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  border-bottom: 1px solid gray;

  img {
    width: 24px;
    height: 24px;
    display: block;
    object-fit: cover;
  }
`;

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

const TextSection = styled.div`
  text-align: left;
`;

const LikeText = styled.div``;

const TitleText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CommentText = styled.div`
  display: flex;
  flex-direction: column;

  color: grey;

  input {
    padding: 5px 0px;
    text-align: left;
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }
`;
