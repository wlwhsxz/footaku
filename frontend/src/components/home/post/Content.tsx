import styled from "styled-components";
import React from "react";

interface ContentProps {
  postImg: string;
}

const Content: React.FC<ContentProps> = ({ postImg }) => {
  return (
    <div>
      <PostMedia>
        <img src={postImg} alt="postImg" />
      </PostMedia>
    </div>
  );
};

export default Content;

const PostMedia = styled.div`
  img {
    width: 100%;
  }
`;
