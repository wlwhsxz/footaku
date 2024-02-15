import styled from "styled-components";

const HotNews = () => {
  return (
    <HotNewsContainer>
      <TitleBox> 
        <h2>🔥 Hot News 🔥</h2>
      </TitleBox>
      {/* <ul> */}
        <div>
          news1 ...
        </div>
        <div>
          news1 ...
        </div>
        <div>
          news1 ...
        </div>
        <div>
          news1 ...
        </div>
        <div>
          news1 ...
        </div>
      {/* </ul> */}
    </HotNewsContainer>
  )
}

export default HotNews;

const HotNewsContainer = styled.div`
  width: 319px;

  margin-top: 110px;
  padding-left: 64px;

  background-color: red;
`

const TitleBox = styled.div`
`