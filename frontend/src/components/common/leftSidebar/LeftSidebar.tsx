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

  const clearCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userObjectId");
    localStorage.removeItem("auth-storage");

    clearCookies();

    window.location.reload();
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
        <NavBox onClick={handleLogout}>
          <LogoutBox>
            <AccountCircleOutlinedIcon />
            <NavLabel>Log out</NavLabel>
          </LogoutBox>
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

  @media (max-width: 768px) {
    width: 60px;
    align-items: center;
  }
`;

const LogoBox = styled.div`
  margin: 0px 0px 19px;
  padding: 25px 12px 16px;

  @media (max-width: 768px) {
    h2 {
      display: none;
    }
  }
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

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
`;

const HomeBox = styled.div`
  display: flex;
  align-items: center;
`;

const LikesBox = styled.div`
  display: flex;
  align-items: center;
`;

const LogoutBox = styled.div`
  display: flex;
  align-items: center;
`;

const NavLabel = styled.span`
  padding: 0px 0px 0px 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SideNavbarContainer = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
