import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <ProfileImg>
        <img src={spursSrc} />
      </ProfileImg>
      <ProfileText>
        <div>name</div>
        <div>location</div>
      </ProfileText>
      <MoreIcon>
        <img
          src="https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/more-512.png"
          alt="more"
        />
      </MoreIcon>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  padding: 0px 0px 12px 4px;

  background-color: aqua;
`;

const ProfileImg = styled.div`
  padding-right: 10px;

  img {
    width: 32px;
    height: 32px;
    display: block;
    object-fit: cover;
    border: 2px double black;
    border-radius: 50%;
  }
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  width: 100%;
`;

const MoreIcon = styled.div`
  width: 32px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const spursSrc =
  "data:image/jpeg;base64,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";
