import styled from 'styled-components';
import { leftSidebarLinks, Nav } from '../../../constatns/leftSidebarLinks';

const LeftSidebar: React.FC = () => {
  console.log(leftSidebarLinks)
  return (
    <Wrapper>
      <LogoBox>
        <h2>Footaku</h2>
      </LogoBox>
        {leftSidebarLinks.map((nav: Nav) => (
          <NavBox key={nav.label}>
            <NavIcon>
              <nav.icon />
            </NavIcon>
            <NavLabel>
              {nav.label}
            </NavLabel>
          </NavBox>
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
`

const NavIcon = styled.div`

`

const NavLabel = styled.span`
  padding: 0px 0px 0px 16px;
`