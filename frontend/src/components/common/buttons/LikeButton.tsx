import { useState } from "react";
import styled from "styled-components";

const LikeButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => setClicked(!clicked);

  const imageUrl = clicked
    ? "https://cdn-icons-png.flaticon.com/128/833/833472.png"
    : "https://cdn-icons-png.flaticon.com/128/7476/7476962.png";

  return (
    <LikeButtonContainer>
      <img src={imageUrl} onClick={handleClick} />
    </LikeButtonContainer>
  );
};

export default LikeButton;

const LikeButtonContainer = styled.div``;
