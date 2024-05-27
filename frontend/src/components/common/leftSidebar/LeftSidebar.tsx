import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Searchbar from "../searchbar/Searchbar";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const LeftSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchBar = () => {
    setIsExpanded(!isExpanded);
    setShowSearchBar(!showSearchBar);
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
        <NavBox onClick={handleSearchBar}>
          <SearchBox>
            <SearchIcon />
            <NavLabel>Search</NavLabel>
          </SearchBox>
        </NavBox>
        <NavBox>
          <LikesBox>
            <FavoriteBorderIcon />
            <NavLabel>Likes</NavLabel>
          </LikesBox>
        </NavBox>
        <NavBox>
          <StyledLink to={`/96minu`}>
            <LikesBox>
              <AccountCircleOutlinedIcon />
              <NavLabel>Profile</NavLabel>
            </LikesBox>
          </StyledLink>
        </NavBox>
        {/* {leftSidebarLinks.map((nav: Nav) => (
        <Link to={nav.route} key={nav.label}>
          <NavBox>
            <NavIcon>
              <nav.icon />
            </NavIcon>
            <NavLabel>{nav.label}</NavLabel>
          </NavBox>
        </Link>
      ))} */}
      </NavContainer>
      <SearchContainer>
        <Searchbar visible={showSearchBar} />
      </SearchContainer>
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
    background: rgb(255, 255, 255, 0.2);
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

const SearchContainer = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
