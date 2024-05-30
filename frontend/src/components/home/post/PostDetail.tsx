import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import PostButtons from "../../common/buttons/PostButtons";
import InputComment from "./footer/InputComment";
import PostTime from "./PostTime";
import TimeAgo from "../../common/time/TimeAgo";
import LikeButton from "../../common/buttons/LikeButton";
import MoreButton from "../../common/buttons/MoreButton";
import { ObjectId } from "mongodb";
import { NewComment } from "../../../types";
import CloseButton from "../../common/buttons/CloseButton";
import { useLikeStore } from "../../../store/useLikeStore";
import { handleMoreButtonClick } from "../../common/moreOptions/moreButtonHandler";
import Popup from "../../common/popups/Popup";
import ConfirmPopup from "../../common/popups/Confirm";

interface PostDetailProps {
  _id: ObjectId;
  postId: string;
  onClose: () => void;
  onPopupClose: () => void;
}

interface Comment {
  _id: ObjectId;
  postId: string;
  userId: string;
  userName: string;
  text: string;
  profileImg: string;
  updatedAt: Date;
  createdAt: Date;
  createdBy: {
    userId: string;
    profileImg: string;
  };
  likes: string[];
}

interface Post {
  content: {
    postImg: string;
    summary: string;
    comments: Comment[];
  };
  name: string;
  profileImg: string;
  updatedAt: Date;
}

const PostDetail: React.FC<PostDetailProps> = ({
  postId,
  _id,
  onClose,
  onPopupClose,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [postData, setPostData] = useState<Post | null>(null);
  const [pastDate, setPastDate] = useState<Date>(new Date());
  const [popupContent, setPopupContent] = useState<string[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);
  const likes = useLikeStore((state) => state.postLikes[postId || ""] || []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleMoreButtonClickWrapper = (
    buttonId: string,
    commentId?: string
  ) => {
    handleMoreButtonClick(
      buttonId,
      setPopupContent,
      setIsPopupOpen,
      setCurrentCommentId,
      commentId
    );
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    onPopupClose();
  };

  const handleAddComment = (newComment: NewComment) => {
    if (postData) {
      const updatedComments = [...postData.content.comments, newComment];
      setPostData({
        ...postData,
        content: {
          ...postData.content,
          comments: updatedComments,
        },
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!postData) return;

    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}/comment/${commentId}`
      );

      if (response.status === 200) {
        const updatedComments = postData.content.comments.filter(
          (comment) => comment._id.toString() !== commentId
        );
        setPostData({
          ...postData,
          content: {
            ...postData.content,
            comments: updatedComments,
          },
        });
        setIsPopupOpen(false);
      } else {
        console.error("Failed to delete the comment");
      }
    } catch (error) {
      console.error("An error occurred while deleting the comment:", error);
    }
  };

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement>,
    isPopupOpen: boolean,
    onClose: () => void
  ) => {
    if (e.target === e.currentTarget && !isPopupOpen) {
      onClose();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/posts/${postId}`
        );
        setPostData(response.data.data);
        setPastDate(new Date(response.data.data.publishedAt));
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isPopupOpen) {
          closePopup();
        } else {
          onClose();
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        if (isPopupOpen) {
          closePopup();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose, isPopupOpen]);

  return (
    <PostDetailContainer
      onClick={(e) => handleContainerClick(e, isPopupOpen, onClose)}
    >
      <CloseButton onClose={onClose} />
      <ContentContainer onClick={(e) => e.stopPropagation()}>
        {postData && (
          <PostMedia>
            <img
              src={postData?.content.postImg}
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
              alt="post"
            />
          </PostMedia>
        )}
        <PostSummary>
          <PostHeader>
            <ClubInfo>
              <StyledLink
                to={`${process.env.REACT_APP_FRONTEND_URL}/${postData?.name
                  .toLowerCase()
                  .split(" ")
                  .join("_")}`}
              >
                <ProfileImg
                  src={postData?.profileImg}
                  alt="post_profile_image"
                />
              </StyledLink>
              <StyledLink
                to={`${process.env.REACT_APP_FRONTEND_URL}/${postData?.name
                  .toLowerCase()
                  .split(" ")
                  .join("_")}`}
              >
                <span>{postData?.name}</span>
              </StyledLink>
            </ClubInfo>
            <StyledMoreButton
              buttonId="post"
              onClick={handleMoreButtonClickWrapper}
            />
          </PostHeader>
          <PostCommentViewSection>
            <span>
              <ProfileImg src={postData?.profileImg} alt="post_profile_image" />
              {postData?.content.summary}
            </span>
            {postData?.content.comments.map((comment) => {
              return (
                <CommentContainer key={comment._id.toString()}>
                  <ProfileImg
                    src={
                      comment.createdBy.profileImg
                        ? comment.createdBy.profileImg
                        : `user.png`
                    }
                    alt="user_image"
                    style={{ display: "inline" }}
                  />
                  <CommentMain>
                    <CommentUpper>
                      <UserName>{comment.createdBy.userId}</UserName>
                      <UserComment>{comment.text}</UserComment>
                    </CommentUpper>
                    <CommentLower>
                      <TimeAgo date={comment.createdAt} />
                      <StyledMoreButton
                        buttonId="comment"
                        onClick={() =>
                          handleMoreButtonClickWrapper(
                            "comment",
                            comment._id.toString()
                          )
                        }
                      />
                    </CommentLower>
                  </CommentMain>
                  <StyledLikeButton
                    postId={postId}
                    commentId={comment._id.toString()}
                    type="comment"
                  />
                </CommentContainer>
              );
            })}
          </PostCommentViewSection>
          <PostFooter>
            <StyledPostButtons focusInput={focusInput} postId={postId} />
            <section>{likes.length} likes</section>
            <PostTime pastDate={pastDate} />
            <PostCommentInputSection>
              <InputComment
                inputRef={inputRef}
                _id={_id}
                postId={postId}
                addComment={handleAddComment}
              />
            </PostCommentInputSection>
          </PostFooter>
        </PostSummary>
      </ContentContainer>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        {popupContent.map((option, index) => (
          <PopupOption
            key={index}
            onClick={
              option === "Delete"
                ? () => handleDeleteComment(currentCommentId!)
                : closePopup
            }
          >
            {option}
          </PopupOption>
        ))}
      </Popup>
      {isConfirmOpen && (
        <ConfirmPopup
          message="정말로 삭제하시겠습니까?"
          onConfirm={() => {
            handleDeleteComment(currentCommentId!);
            setIsConfirmOpen(false);
          }}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </PostDetailContainer>
  );
};

export default PostDetail;

const PostDetailContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  font-size: 14px;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 70vw;
  height: 70vh;
  background-color: white;
  border-radius: 8px;

  @media (max-width: 1440px) {
    height: 600px;
  }

  @media (max-width: 1200px) {
    height: 500px;
  }

  @media (max-width: 1000px) {
    height: 400px;
  }

  @media (max-width: 800px) {
    height: 350px;
  }
`;

const PostMedia = styled.div`
  flex: 1;
`;

const PostSummary = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  border-bottom: 1px solid rgb(199, 199, 199, 0.5);

  @media (min-width: 1200px) {
    flex: 1;
  }
`;

const ClubInfo = styled.div`
  display: flex;
  align-items: center;

  padding: 14px 4px 14px 16px;
  font-weight: 600;
`;

const StyledMoreButton = styled(MoreButton)`
  display: inline;

  img {
    width: 14px;
    height: auto;
    padding: 8px;
    display: inline;
  }
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const PostCommentViewSection = styled.div`
  flex: 7;
  padding: 16px;
  border-bottom: 1px solid rgb(199, 199, 199, 0.5);
  overflow-y: auto;

  span {
    display: flex;
  }

  @media (min-width: 1200px) {
    flex: 8;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 18px 0;
`;

const CommentMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentUpper = styled.div`
  display: flex;

  span {
    margin-right: 4px;
  }
`;

const UserName = styled.span`
  font-weight: 600;
  color: black;
`;

const UserComment = styled.span`
  font-weight: 400;
`;

const CommentLower = styled.div`
  display: flex;
  align-items: center;

  ${StyledMoreButton} {
    visibility: hidden;
  }

  &:hover ${StyledMoreButton} {
    visibility: visible;
  }
`;

const StyledLikeButton = styled(LikeButton)`
  @media (max-width: 1200px) {
    img {
      width: 18px !important;
      height: 18px !important;
    }
    margin-left: auto;
  }

  @media (max-width: 800px) {
    img {
      width: 14px !important;
      height: 14px !important;
    }
    margin-left: auto;
  }
`;

const PostFooter = styled.div`
  flex: 3;

  padding: 8px;

  @media (min-width: 1200px) {
    flex: 2;
  }
`;

const PostCommentInputSection = styled.div``;

const StyledPostButtons = styled(PostButtons)``;

const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  display: block;
  object-fit: cover;
  border: 2px double black;
  border-radius: 50%;
  margin-right: 14px;
`;

const PopupOption = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
