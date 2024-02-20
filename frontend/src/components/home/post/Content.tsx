import styled from "styled-components";
import React from "react";

interface ContentProps {
  postImg: string;
}

const Content: React.FC<ContentProps> = ({ postImg }) => {
  return (
    <div>
      <PostContent>
        <img src={postImg} alt="postImg" />
      </PostContent>
    </div>
  );
};

export default Content;

const PostContent = styled.div`
  img {
    width: 100%;
  }
`;
