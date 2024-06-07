import React, { useEffect, useState, Fragment, Suspense, lazy } from "react";
import styled from "styled-components";
import axios from "axios";
import { PostData } from "../../../types";
import { useLikeStore } from "../../../store/useLikeStore";

const Header = lazy(() => import("./Header"));
const Content = lazy(() => import("./Content"));
const Footer = lazy(() => import("./footer/Footer"));

const Post: React.FC = () => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const updatePostLikes = useLikeStore((state) => state.updatePostLikes);
  const updateCommentLikes = useLikeStore((state) => state.updateCommentLikes);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        { withCredentials: true }
      );
      const data = response.data as { data: PostData[] };
      setPostData(data.data);

      data.data.forEach((club) => {
        club.posts.forEach((post) => {
          updatePostLikes(
            post.postId,
            post.likes.map((like) => like)
          );
          post.content?.comments?.forEach((comment) => {
            updateCommentLikes(
              comment._id.toString(),
              comment.likes.map((like) => like)
            );
          });
        });
      });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (postData.length === 0) return <div>Loading...</div>;

  return (
    <Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        {postData.map((club) =>
          club.posts.map((post) => (
            <PostContainer key={post.postId}>
              <Header
                name={post.name}
                profileImg={post.profileImg}
                pastDate={new Date(post.publishedAt)}
              />
              <Content postImg={post.content?.postImg} postURL={post.postURL} />
              <Footer
                _id={post._id}
                postId={post.postId}
                comments={post.content?.comments}
                summary={post.content?.summary}
              />
            </PostContainer>
          ))
        )}
      </Suspense>
    </Fragment>
  );
};

export default Post;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 468px;
  margin-bottom: 20px;
`;
