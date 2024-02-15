import styled from "styled-components";

const Footer = () => {

  return (
    <FooterContainer>
      <ButtonSection>
        <LeftButtonBox>
          <div>
            <img src='https://cdn-icons-png.flaticon.com/128/7476/7476962.png' />
          </div>
          <div>
            <img src='https://cdn-icons-png.flaticon.com/128/54/54467.png' /> 
          </div>         
          <div>
            <img src='https://cdn-icons-png.flaticon.com/128/2990/2990295.png' />          
          </div>
        </LeftButtonBox>
        <RightButtonBox>
          <div>
            <img src='https://cdn-icons-png.flaticon.com/128/5662/5662990.png' />
          </div>
        </RightButtonBox>
      </ButtonSection>
      <TextSection>
        <LikeText>
          3,654,321 likes
        </LikeText>
        <TitleText>       
          content text content text content text content text content text content text content text content text content text content text content text content text content text content text content text content text 
        </TitleText>
        <CommentText>
          view all 4,219 comments
          <input placeholder="Add a comment..."/>
        </CommentText>
      </TextSection>
    </FooterContainer>
  )
}

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;


  border-bottom: 1px solid gray;

  img {
    width: 24px;
    height: 24px;
    display: block; 
    layout: fill;
    object-fit: cover;
  }
`

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

`

const LeftButtonBox = styled.div`
  display: flex;

  div {
    padding: 8px;
  }
`

const RightButtonBox = styled.div`
div {
  padding: 8px;
}
`

const TextSection = styled.div`
  text-align: left;
`;

const LikeText = styled.div`

`

const TitleText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const CommentText = styled.div`
  display: flex;
  flex-direction: column;

  color: grey;

  input {
    padding: 5px 0px;
    text-align: left;
    border: none;
    background-color: transparent;
    
    &:focus {
      outline: none;
    }
  }
  
`