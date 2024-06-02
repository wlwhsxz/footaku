import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Searchbar from "../searchbar/Searchbar";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import useAuthStore from "../../../store/useAuthStore";
import Likesbar from "../../likesbar/Likesbar";

const LeftSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [showLikesbar, setShowLikesbar] = useState(false);
  const user = useAuthStore((state) => state.user);
  const userId = user?.userId;

  const handleNavBar = (nav: string) => {
    setIsExpanded(!isExpanded);
    if (nav === "search") {
      setShowSearchbar(!showSearchbar);
      setShowLikesbar(false);
    } else {
      setShowLikesbar(!showLikesbar);
      setShowSearchbar(false);
    }
  };

  return (
    <LeftSidebarContainer>
      <NavContainer $isExpanded={isExpanded}>
        <LogoBox>
          <h2>Footaku</h2>
        </LogoBox>
        <NavBox>
          <StyledLink to="/">
            <HomeBox>
              <HomeIcon />
              <NavLabel>Home</NavLabel>
            </HomeBox>
          </StyledLink>
        </NavBox>
        <NavBox onClick={() => handleNavBar("search")}>
          <SearchBox>
            <SearchIcon />
            <NavLabel>Search</NavLabel>
          </SearchBox>
        </NavBox>
        <NavBox onClick={() => handleNavBar("likes")}>
          <LikesBox>
            <FavoriteBorderIcon />
            <NavLabel>Likes</NavLabel>
          </LikesBox>
        </NavBox>
        <NavBox>
          <StyledLink to={`${userId}`}>
            <LikesBox>
              <AccountCircleOutlinedIcon />
              <NavLabel>Profile</NavLabel>
            </LikesBox>
          </StyledLink>
        </NavBox>
      </NavContainer>
      <SideNavbarContainer>
        <Searchbar visible={showSearchbar} />
        <Likesbar visible={showLikesbar} />
      </SideNavbarContainer>
    </LeftSidebarContainer>
  );
};

export default LeftSidebar;

const LeftSidebarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavContainer = styled.div<{ $isExpanded: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$isExpanded ? "120px" : "200px")};
  height: 100vh;
  padding: 8px 12px 20px 12px;
  background-color: black;
  color: white;
  transition: width 0.3s;
`;

const LogoBox = styled.div`
  margin: 0px 0px 19px;
  padding: 25px 12px 16px;
`;

const NavBox = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 48px;

  margin: 4px 0px;
  padding: 12px 6px;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
  }

  color: white;
`;

const SearchBox = styled.div``;

const HomeBox = styled.div``;

const LikesBox = styled.div``;

const NavIcon = styled.div``;

const NavLabel = styled.span`
  padding: 0px 0px 0px 16px;
`;

const SideNavbarContainer = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
