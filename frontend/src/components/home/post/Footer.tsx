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
      <TextSection>content text content text content text content text content text content text content text content text content text content text content text content text content text content text content text content text </TextSection>
    </FooterContainer>
  )
}

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;

  div {
    padding: 8px;
  }

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
`

const RightButtonBox = styled.div``

const TextSection = styled.div`
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;