import axios from "axios";
import { useState, useRef } from "react";
import useAuthStore from "../../../store/useAuthStore";

interface Like {
  _id: string;
}

interface LikeButtonProps {
  className?: string;
  postId?: string;
  likes?: Like[];
  updateLikes?: (newLikes: Like[]) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className,
  postId,
  likes,
  updateLikes,
  ...props
}) => {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id.toString();

  const [clicked, setClicked] = useState(
    userId && likes?.some((like) => like._id === userId)
  );
  const lastClickTime = useRef(0);

  const handleClick = async () => {
    const now = Date.now();
    if (now - lastClickTime.current >= 1000) {
      setClicked(!clicked);
      if (userId) {
        try {
          if (!clicked) {
            console.log("like");
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/posts/${postId}/likes`,
              { userId }
            );
            if (updateLikes) {
              updateLikes(response.data.data.postLikes);
            }
          } else {
            console.log("unlike");
            const response = await axios.delete(
              `${process.env.REACT_APP_API_URL}/api/posts/${postId}/likes`,
              {
                headers: { "user-id": userId },
              }
            );
            if (updateLikes) {
              updateLikes(response.data.data.postLikes);
            }
            console.log(response);
          }
        } catch (error) {
          console.error("Error processing the like/unlike action", error);
        }
      }
      lastClickTime.current = now;
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
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer" }}
        alt="like_button"
      />
    </div>
  );
};

export default LikeButton;
