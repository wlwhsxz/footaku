import React from "react";
import DeleteOption from "../moreOptions/DeleteOption";

interface MoreButtonProps {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  buttonId?: string;
  onClose: () => void;
}

const MoreButton: React.FC<MoreButtonProps> = ({
  className,
  isActive,
  onClick,
  buttonId,
  onClose,
  ...props
}) => {
  const renderOptions = () => {
    switch (buttonId) {
      case "delete":
        return <DeleteOption onClose={handleClose} />;
      case "":
        return null;
      default:
        return null;
    }
  };

  const handleClose = () => {
    buttonId = "";
  };

  return (
    <span className={className} {...props}>
      <img
        src="https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/more-512.png"
        onClick={onClick}
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer" }}
        alt="more_button"
      />
      {isActive && renderOptions()}
    </span>
  );
};

export default MoreButton;
