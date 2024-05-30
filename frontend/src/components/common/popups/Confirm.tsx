import React from "react";
import styled from "styled-components";

interface ConfirmPopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <PopupContainer>
      <PopupContent>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button onClick={onConfirm}>예</Button>
          <Button onClick={onCancel}>아니오</Button>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

export default ConfirmPopup;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const Message = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;
