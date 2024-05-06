import { useState } from "react";

interface LikeButtonProps {
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ className, ...props }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => setClicked(!clicked);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  };

  const imageUrl = clicked
    ? "https://cdn-icons-png.flaticon.com/128/833/833472.png"
    : "https://cdn-icons-png.flaticon.com/128/7476/7476962.png";

  return (
    <div className={className} {...props}>
      <img
        src={imageUrl}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer" }}
        alt="like_button"
      />
    </div>
  );
};

export default LikeButton;
