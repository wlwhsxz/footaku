import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Content from "./Content";
import Footer from "./footer/Footer";
import Header from "./Header";
import { PostData } from "../../../types/index";

const Post = () => {
  const [postData, setPostData] = useState<PostData | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/posts");
      const data = (await response.json()) as { data: PostData[] };
      console.log("data", data.data);

      setPostData(data.data[0]);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!postData) return <div>Loading...</div>;

  return (
    <PostContainer>
      <Header name={postData?.name} profileImg={postData?.profileImg} />
      <Content postImg={postData?.content?.postImg} />
      <Footer
        comments={postData?.content?.comments}
        summary={postData?.content?.summary}
      />
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 468px;
  background-color: lime;
`;
