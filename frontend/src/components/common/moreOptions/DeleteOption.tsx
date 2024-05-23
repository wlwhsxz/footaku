import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CloseButton from "../buttons/CloseButton";

interface DeleteOptionProps {
  onClose: () => void;
}

const DeleteOption: React.FC<DeleteOptionProps> = ({ onClose }) => {
  const optionsBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsBoxRef.current &&
        !optionsBoxRef.current.contains(event.target as Node)
      ) {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <DeleOptionContainer onClick={(e) => e.stopPropagation()}>
      <OptionsBox ref={optionsBoxRef}>
        <DeleteBox>Delete</DeleteBox>
        <div onClick={onClose}>Cancel</div>
      </OptionsBox>
    </DeleOptionContainer>
  );
};

export default DeleteOption;

const DeleOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);
`;

const OptionsBox = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 384px;
    height: 48px;

    padding: 4px 8px;
    font-size: 14px;
    border-radius: 10px;
    background-color: white;
  }
`;

const DeleteBox = styled.div`
  color: red;
`;
