import styled from 'styled-components';

import LeftSidebar from "../../components/common/LeftSidebar/LeftSidebar";
import HotNews from "../../components/home/HotNews";
import Post from '../../components/home/post/Post';
import Story from "../../components/home/Story";

const Home = () => {
  return(
    <HomePageLayout>
      <LeftSidebar />
      <MainContent>
        <ContentWrapper>
          <StorySection>
            <Story />
          </StorySection>
          <PostSection>
            <Post />
          </PostSection>
        </ContentWrapper>
        <HotNewsSection>
          <HotNews />
        </HotNewsSection>
      </MainContent>
    </HomePageLayout>
  )
}

export default Home;

const HomePageLayout = styled.div`
  display: flex;
`

const MainContent = styled.div`
  display: flex;
  justify-content: center;

  width: 100vw;

  background-color: pink;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 630px;

`

const StorySection = styled.div`
  background-color: orange;
`

const PostSection = styled.div`
  display: flex;
  justify-content: center;

  background-color: #f0f0f0;
`

const HotNewsSection = styled.div`
  width: 319px
`
