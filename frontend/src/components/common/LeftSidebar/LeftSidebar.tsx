import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Nav, leftSidebarLinks } from '../../../constatns/leftSidebarLinks';

const LeftSidebar: React.FC = () => {

  const NavHandler = (label: string) => (e: React.MouseEvent) => {
    console.log(`Clicked on: ${label}`);
    // 여기에 필요한 로직을 추가할 수 있습니다. 예를 들어, 페이지 이동 또는 상태 업데이트 등
  }

  return (
    <Wrapper>
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
    </Wrapper>
  );
};


export default LeftSidebar;

const Wrapper = styled.div`
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