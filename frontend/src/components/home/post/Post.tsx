import styled from "styled-components";
import Content from "./Content";
import Footer from './Footer';
import Header from "./Header";

const Post = () => {
  return (
    <PostContainer>
      <Header />
      <Content />
      <Footer />
    </PostContainer>
  )
}

export default Post;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 468px;

  background-color: lime;
`