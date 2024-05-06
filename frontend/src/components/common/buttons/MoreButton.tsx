import React, { useState } from "react";

interface MoreButtonProps {
  className?: string;
}

const MoreButton: React.FC<MoreButtonProps> = ({ className, ...props }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => setClicked(!clicked);

  return (
    <span className={className} {...props}>
      <img
        src="https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/more-512.png"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer" }}
        alt="more_button"
      />
    </span>
  );
};

export default MoreButton;
