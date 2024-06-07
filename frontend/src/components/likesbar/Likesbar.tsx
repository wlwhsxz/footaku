import React, { useEffect, useState, Suspense, lazy, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

interface LikesbarProps {
  visible: boolean;
}

interface PostContentProps {
  postImg: string;
  summary: string;
}

interface PostProps {
  postId: string;
  profileImg: string;
  postURL: string;
  name: string;
  content: PostContentProps;
}

const Likesbar: React.FC<LikesbarProps> = ({ visible }) => {
  const [likedPosts, setLikedPosts] = useState<PostProps[]>([]);
  const user = useAuthStore((state) => state.user);
  const userId = user?._id;

  const fetchLikedPosts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts/likes`,
        {
          params: {
            userId,
          },
        }
      );
      setLikedPosts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch liked posts:", error);
      setLikedPosts([]);
    }
  }, [userId]);

  useEffect(() => {
    if (visible) {
      fetchLikedPosts();
    }
  }, [visible, fetchLikedPosts]);

  if (!visible) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LikesbarContainer $visible={visible}>
        <LikesHeaderBox>Liked Posts</LikesHeaderBox>
        <LikesContentBox>
          {likedPosts.map((post) => (
            <Post key={post.postId}>
              <PostHeader>
                <Link
                  to={`${process.env.REACT_APP_FRONTEND_URL}/club/${post.name
                    .toLocaleLowerCase()
                    .replaceAll(" ", "_")}`}
                >
                  <div>
                    <span>
                      <img src={post.profileImg} alt="profileImage" />
                    </span>
                    <span>{post.name}</span>
                  </div>
                </Link>
              </PostHeader>
              <PostContent>
                <PostImage
                  src={post.content.postImg}
                  alt="Post"
                  onClick={() => window.open(post.postURL)}
                />
                <PostLike>❤️</PostLike>
              </PostContent>
              <PostSummary>
                <span>{post.content.summary}</span>
              </PostSummary>
            </Post>
          ))}
        </LikesContentBox>
      </LikesbarContainer>
    </Suspense>
  );
};

export default Likesbar;

const slideIn = keyframes`
  from {
    transform: translateX(-10%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const LikesbarContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 140px;
  width: 397px;
  height: 100vh;
  justify-content: start;
  padding: 8px 0;
  background: white;
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.5);
  transform: translateX(${(props) => (props.$visible ? "0" : "-100%")});
  animation: ${(props) => (props.$visible ? slideIn : slideOut)} 0.5s forwards;
`;

const LikesContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: calc(100vh - 90px);
`;

const LikesHeaderBox = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin: 8px 0;
  padding: 24px 14px 14px 24px;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 364px;
  background: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  margin-bottom: 10px;

  div {
    display: flex;
    justify-content: center;
  }

  a {
    text-decoration: none;

    span {
      padding-right: 10px;
      font-weight: 500;
      color: black;
    }
  }

  img {
    width: 24px;
  }
`;

const PostContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #333;
`;

const PostImage = styled.img`
  flex: 8;
  max-width: 90%;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const PostLike = styled.span`
  flex: 2;
  padding: 10px;
`;

const PostSummary = styled.div`
  font-weight: 700;
`;
