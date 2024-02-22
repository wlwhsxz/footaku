import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Nav, leftSidebarLinks } from '../../../constatns/leftSidebarLinks';

const LeftSidebar: React.FC = () => {

  const NavHandler = (label: string) => (e: React.MouseEvent) => {
    console.log(`Clicked on: ${label}`);
  }

  return (
    <LeftSidebarContainer>
      <LogoBox>
        <h2>Footaku</h2>
      </LogoBox>
        {leftSidebarLinks.map((nav: Nav) => (
          <Link to={nav.route} key={nav.label}>
            <NavBox>
              <NavIcon>
                <nav.icon />
              </NavIcon>
              <NavLabel>
                {nav.label}
              </NavLabel>
            </NavBox>
          </Link>
        ))}
    </LeftSidebarContainer>
  );
};


export default LeftSidebar;

const LeftSidebarContainer = styled.div`
  position: fixed
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 220px;
  height: 100vh; 
  
  padding: 8px 12px 20px 12px;
  
  background-color: black;
  color: white;
`;

const LogoBox = styled.div`
  margin: 0px 0px 19px;
  padding: 25px 12px 16px;
`

const NavBox = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 48px;

  margin: 4px 0px;
  padding: 12px;

  &:hover {
    cursor: pointer;
    background: rgb(255,255,255,0.2)
  }

  color: white;
`

const NavIcon = styled.div`

`

const NavLabel = styled.span`
  padding: 0px 0px 0px 16px;
`