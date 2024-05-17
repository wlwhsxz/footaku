import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import Content from "./Content";
import Footer from "./footer/Footer";
import Header from "./Header";
import { PostData } from "../../../types";
import { useLikeStore } from "../../../store/useLikeStore";

const Post: React.FC = () => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const updatePostLikes = useLikeStore((state) => state.updatePostLikes);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts`
      );
      const data = (await response.json()) as { data: PostData[] };
      setPostData(data.data);

      // Initialize likes in Zustand store
      data.data.forEach((club) => {
        club.posts.forEach((post) => {
          updatePostLikes(
            post.postId,
            post.likes.map((like) => like._id)
          );
        });
      });

      console.log("initial post data - ", data);
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
              postId={post.postId}
              comments={post.content?.comments}
              summary={post.content?.summary}
              _id={post._id}
            />
          </PostContainer>
        ))
      )}
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
