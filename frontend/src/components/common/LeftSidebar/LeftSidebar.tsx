import styled from 'styled-components';
import { leftSidebarLinks, Link } from '../../../constatns/leftSidebarLinks';

const LeftSidebar: React.FC = () => {
  console.log(leftSidebarLinks)
  return (
    <Wrapper>
      <ul>
        {leftSidebarLinks.map((link: Link) => (
          <li key={link.label}>
            {link.label}
          </li>
        ))}
      </ul>
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
  background-color: yellow;
`;
