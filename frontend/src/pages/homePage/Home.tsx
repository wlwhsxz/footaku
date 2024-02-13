import styled from 'styled-components';

import LeftSidebar from "../../components/common/LeftSidebar/LeftSidebar";
import HotNews from "../../components/home/HotNews";
import Story from "../../components/home/Story";

const Home = () => {
  return(
    <HomeContainer>
      <LeftSidebar />
      <div>
        <Story />
        Home
        <HotNews />
      </div>
    </HomeContainer>
  )
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

