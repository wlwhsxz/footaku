import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PostButtons from "../../common/buttons/PostButtons";
import { Link } from "react-router-dom";
import InputComment from "./footer/InputComment";
import PostTime from "./PostTime";
import TimeAgo from "../../common/time/TimeAgo";
import LikeButton from "../../common/buttons/LikeButton";
import MoreButton from "../../common/buttons/MoreButton";
import { ObjectId } from "mongodb";
import { NewComment } from "../../../types";
import CloseButton from "../../common/buttons/CloseButton";
import { useLikeStore } from "../../../store/useLikeStore";

interface PostDetailProps {
  postId?: string;
  _id: ObjectId;
  addComment: (newComment: NewComment) => void;
  onClose: () => void;
}

interface Comment {
  text: string;
  name: string;
  profileImg: string;
  userId: string;
  updatedAt: Date;
  createdBy: {
    userId: string;
    profileImg: string;
  };
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
  addComment,
  onClose,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [postData, setPostData] = useState<Post | null>(null);
  const [pastDate, setPastDate] = useState<Date>(new Date());
  const [activeButton, setActiveButton] = useState("");
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const likes = useLikeStore((state) => state.postLikes[postId || ""] || []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleMoreButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
    setIsMoreOptionsOpen(true);
    console.log(buttonId);
  };

  const closeMoreOptions = () => {
    setIsMoreOptionsOpen(false);
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}`
      );
      const data = await response.json();
      console.log(data);
      setPostData(data.data);
      setPastDate(new Date(data.data.publishedAt));
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <PostDetailContainer onClick={onClose}>
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
            <StyledMoreButton onClose={closeMoreOptions} />
          </PostHeader>
          <PostCommentViewSection>
            <span>
              <ProfileImg src={postData?.profileImg} alt="post_profile_image" />
              {postData?.content.summary}
            </span>
            {postData?.content.comments.map((comment) => {
              console.log("comment", comment);
              return (
                <Comment key={comment.userId}>
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
                      <TimeAgo date={comment.updatedAt} />
                      <StyledMoreButton
                        onClick={() => handleMoreButtonClick("delete")}
                        isActive={activeButton === "delete"}
                        buttonId="delete"
                        onClose={closeMoreOptions}
                      />
                    </CommentLower>
                  </CommentMain>
                  <StyledLikeButton commentId={comment.userId} type="comment" />
                </Comment>
              );
            })}
          </PostCommentViewSection>
          <PostFooter>
            <StyledPostButtons focusInput={focusInput} postId={postId!} />
            <section>{likes.length} likes</section>
            <PostTime pastDate={pastDate} />
            <PostCommentInputSection>
              <InputComment
                inputRef={inputRef}
                _id={_id}
                addComment={handleAddComment}
              />
            </PostCommentInputSection>
          </PostFooter>
        </PostSummary>
      </ContentContainer>
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

const Comment = styled.div`
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
  img {
    width: 12px;
    height: 12px;
  }
  margin-left: auto;
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
