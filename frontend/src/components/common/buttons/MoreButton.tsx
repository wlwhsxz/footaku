import React from "react";

interface MoreButtonProps {
  className?: string;
  buttonId: string;
  onClick: (buttonId: string) => void;
}

const MoreButton: React.FC<MoreButtonProps> = ({
  className,
  buttonId,
  onClick,
  ...props
}) => {
  return (
    <span className={className} {...props} onClick={() => onClick(buttonId)}>
      <img
        src="https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/more-512.png"
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer" }}
        alt="more_button"
      />
    </span>
  );
};

export default MoreButton;
