import axios from "axios";
import { useState, useEffect, useRef } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { useLikeStore } from "../../../store/useLikeStore";

interface LikeButtonProps {
  className?: string;
  postId?: string;
  commentId?: string;
  type: "post" | "comment";
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className,
  postId,
  commentId,
  type,
  ...props
}) => {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id.toString();

  const postLikes = useLikeStore((state) => state.postLikes);
  const commentLikes = useLikeStore((state) => state.commentLikes);
  const updatePostLikes = useLikeStore((state) => state.updatePostLikes);
  const updateCommentLikes = useLikeStore((state) => state.updateCommentLikes);

  const likes =
    type === "post"
      ? postLikes[postId || ""] || []
      : commentLikes[commentId || ""] || [];
  const updateLikes = type === "post" ? updatePostLikes : updateCommentLikes;

  const [clicked, setClicked] = useState<boolean>(
    Boolean(userId) && likes.includes(userId!)
  );
  const lastClickTime = useRef<number>(0);

  const handleClick = async () => {
    const now = Date.now();
    if (now - lastClickTime.current >= 1000) {
      if (userId) {
        try {
          if (!clicked) {
            console.log("like");
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/${
                type === "post" ? `posts/${postId}` : `comments/${commentId}`
              }/likes`,
              { userId }
            );
            updateLikes(
              type === "post" ? postId! : commentId!,
              response.data.data.postLikes
            );
          } else {
            console.log("unlike");
            const response = await axios.delete(
              `${process.env.REACT_APP_API_URL}/api/${
                type === "post" ? `posts/${postId}` : `comments/${commentId}`
              }/likes`,
              {
                headers: { "user-id": userId },
              }
            );
            updateLikes(
              type === "post" ? postId! : commentId!,
              response.data.data.postLikes
            );
          }
        } catch (error) {
          console.error("Error processing the like/unlike action", error);
        }
      }
      setClicked(!clicked);
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
