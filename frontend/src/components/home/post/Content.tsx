import styled from "styled-components";
import React, { useEffect } from "react";

interface ContentProps {
  postImg?: string;
  postURL?: string;
}

const Content: React.FC<ContentProps> = ({ postImg, postURL }) => {
  return (
    <div>
      <PostMedia>
        <img src={postImg} alt="postImg" onClick={() => window.open(postURL)} />
      </PostMedia>
    </div>
  );
};

export default Content;

const PostMedia = styled.div`
  img {
    width: 100%;
    &:hover {
      cursor: pointer;
      width: 101%;
    }
  }
`;
