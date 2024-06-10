import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostTime from "./PostTime";

interface HeaderProps {
  name?: string;
  profileImg?: string;
  pastDate: Date;
}

const Header: React.FC<HeaderProps> = ({ name, profileImg, pastDate }) => {
  return (
    <HeaderContainer>
      <ProfileImg>
        <StyledLink
          to={`${process.env.REACT_APP_FRONTEND_URL}/club/${name
            ?.toLowerCase()
            .split(" ")
            .join("_")}`}
        >
          <img src={profileImg} alt="profile_image" />
        </StyledLink>
      </ProfileImg>
      <ProfileText>
        <StyledLink
          to={`${process.env.REACT_APP_FRONTEND_URL}/club/${name
            ?.toLowerCase()
            .split(" ")
            .join("_")}`}
        >
          {name}
          {<StyledPostTime pastDate={pastDate} />}
        </StyledLink>
      </ProfileText>
      <MoreIcon>
        <img
          src="https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/more-512.png"
          alt="more"
        />
      </MoreIcon>
    </HeaderContainer>
  );
};

export default React.memo(Header);

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-between;
  align-items: center;

  padding: 0px 0px 12px 4px;
`;

const ProfileImg = styled.div`
  padding-right: 10px;

  img {
    width: 32px;
    height: 32px;
    display: block;
    object-fit: cover;
    border: 2px double black;
    border-radius: 50%;
  }
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  width: 100%;
`;

const StyledLink = styled(Link)`
  font-weight: 500;
  color: black;
  text-decoration: none;
`;

const MoreIcon = styled.div`
  width: 32px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const StyledPostTime = styled(PostTime)`
  display: inline;
`;
