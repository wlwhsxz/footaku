import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import Content from "./Content";
import Footer from "./footer/Footer";
import Header from "./Header";
import { PostData } from "../../../types/index";

const Post = () => {
  const [postData, setPostData] = useState<PostData[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/posts");
      const data = (await response.json()) as { data: PostData[] };
      console.log("data", data.data);

      setPostData(data.data);
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
      {postData.map((post) => (
        <PostContainer key={post.postId}>
          <Header name={post.name} profileImg={post.profileImg} />
          <Content postImg={post.content?.postImg} />
          <Footer
            _id={post._id}
            likes={post.likes}
            comments={post.content?.comments}
            summary={post.content?.summary}
          />
        </PostContainer>
      ))}
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

  background-color: lime;
`;
