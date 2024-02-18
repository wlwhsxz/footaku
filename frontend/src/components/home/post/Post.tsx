import styled from "styled-components";
import Content from "./Content";
import Footer from "./footer/Footer";
import Header from "./Header";

const Post = () => {
  const fetchPosts = async () => {
    const data = await fetch("http://localhost:8080/api/posts");
    const post = await data.json();

    console.log(post);
  };

  fetchPosts();

  return (
    <PostContainer>
      <Header />
      <Content />
      <Footer />
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
