import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PostDetail from "../PostDetail";
import PostButtons from "../../../common/buttons/PostButtons";
import InputComment from "./InputComment";
import { ObjectId } from "mongodb";
import { NewComment } from "../../../../types";
import { useLikeStore } from "../../../../store/useLikeStore";
import useAuthStore from "../../../../store/useAuthStore";
import Popup from "../../../common/popup/Popup"; // Popup 컴포넌트 import

interface FooterProps {
  _id: ObjectId;
  postId: string;
  comments: NewComment[];
  summary: string;
}

const Footer: React.FC<FooterProps> = ({ _id, postId, summary, comments }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [commentsData, setCommentsData] = useState<NewComment[]>(
    comments || []
  );
  const likes = useLikeStore((state) => state.postLikes[postId] || []);
  const user = useAuthStore((state) => state.user);
  const userId = user?.userId;

  const addComment = (newComment: NewComment) => {
    setCommentsData((prevComments) => [
      ...prevComments,
      { ...newComment, newlyAdded: true },
    ]);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const closePostDetail = () => {
    setIsPostDetailOpen(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isPostDetailOpen || isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isPostDetailOpen, isPopupOpen]);

  return (
    <FooterContainer>
      <PostButtons focusInput={focusInput} postId={postId} />
      <TextSection>
        <LikeText>{likes.length} Likes</LikeText>
        <TitleText>{summary}</TitleText>
        <CommentText>
          <ViewComments onClick={() => setIsPostDetailOpen(!isPostDetailOpen)}>
            view all {comments?.length.toLocaleString()} comments
          </ViewComments>
          {commentsData.map(
            (comment) =>
              comment._id && (
                <StyledNewComment
                  key={comment._id.toString()}
                  $isVisible={comment.newlyAdded ?? false}
                >
                  <span>{comment.createdBy.userId}</span>
                  <span>{comment.text}</span>
                </StyledNewComment>
              )
          )}
          <InputComment
            inputRef={inputRef}
            postId={postId}
            _id={_id}
            addComment={addComment}
          />
          {isPostDetailOpen && (
            <PostDetail
              postId={postId}
              _id={_id}
              onClose={closePostDetail}
              onPopupClose={closePopup}
            />
          )}
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
  padding: 0 10px 10px;
`;

const LikeText = styled.div``;

const TitleText = styled.div`
  font-weight: 700;
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

  &:hover {
    cursor: pointer;
  }
`;

const StyledNewComment = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  align-items: center;
  margin-top: 2px;

  span {
    margin: 0px 8px 0px 0px;
  }
`;
