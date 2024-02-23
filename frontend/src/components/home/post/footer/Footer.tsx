import styled, { createGlobalStyle } from "styled-components";

import { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { Comments } from "../../../../types/index";
import PostDetail from "../PostDetail";
import PostButtons from "../../../common/buttons/PostButtons";

interface FooterProps {
  likes: number;
  comments: Comments[];
  summary: string;
}

const Footer: React.FC<FooterProps> = ({likes, summary, comments }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPostDetailOpen, SetIsPostDetailOpen] = useState(false);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const closePostDetail = () => {
    SetIsPostDetailOpen(false);
  };  

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isPostDetailOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }
  
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isPostDetailOpen]);

  return (
    <FooterContainer>
      <PostButtons focusInput={focusInput}/>
      <TextSection>
        <LikeText>{likes.toLocaleString()} Likes</LikeText>
        <TitleText>{summary}</TitleText>
        <CommentText>
          <ViewComments onClick={() => SetIsPostDetailOpen(!isPostDetailOpen)}>
            view all {comments.length.toLocaleString()} comments
          </ViewComments>
          <Comment inputRef={inputRef} />
          {isPostDetailOpen && <PostDetail onClose={closePostDetail} />}
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

const ViewComments = styled.div`
  width: fit-content;
  background-color: yellow;
`