import React from "react";
import styled from "styled-components";

interface FollowButtonProps {
  isFollowing: boolean;
  onClick: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  onClick,
}) => {
  return (
    <FollowButtonContainer isFollowing={isFollowing} onClick={onClick}>
      {isFollowing ? "Following" : "Follow"}
    </FollowButtonContainer>
  );
};

export default FollowButton;

const FollowButtonContainer = styled.div<FollowButtonProps>`
  height: fit-content;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 7px 16px;
  margin-left: 24px;
  border-radius: 8px;
  border: none;
  color: ${({ isFollowing }) => (isFollowing ? "black" : "white")};
  background-color: ${({ isFollowing }) =>
    isFollowing ? "#eaeaea" : "#0095f6"};
  cursor: pointer;
`;
