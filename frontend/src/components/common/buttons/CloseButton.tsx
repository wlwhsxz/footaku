import styled from "styled-components";

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <StyledCloseButton onClick={onClose}>
      <img
        src="https://cdn-icons-png.flaticon.com/128/458/458595.png"
        alt="Close"
      />
    </StyledCloseButton>
  );
};

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  margin: 20px 20px 0 0;

  img {
    width: 16px;
    height: 16px;
  }
`;

export default CloseButton;
