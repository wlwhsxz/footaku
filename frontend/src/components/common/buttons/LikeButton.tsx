import axios from "axios";
import { useEffect, useRef, useMemo } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { useLikeStore } from "../../../store/useLikeStore";

interface LikeButtonProps {
  className?: string;
  postId?: string;
  commentId?: string;
  type: "post" | "comment";
  isLiked?: boolean;
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

  const {
    postLikes,
    commentLikes,
    clickedPost,
    clickedComment,
    updatePostLikes,
    updateCommentLikes,
    setClickedPost,
    setClickedComment,
  } = useLikeStore((state) => state);

  const likes = useMemo(() => {
    return type === "post"
      ? postLikes[postId || ""] || []
      : commentLikes[commentId || ""] || [];
  }, [postLikes, commentLikes, postId, commentId, type]);

  const updateLikes = type === "post" ? updatePostLikes : updateCommentLikes;
  const setClicked = type === "post" ? setClickedPost : setClickedComment;
  const clicked =
    type === "post"
      ? clickedPost[postId || ""]
      : clickedComment[commentId || ""];

  useEffect(() => {
    if (userId && likes) {
      const isLiked = likes.some((likeId: any) => likeId._id.includes(userId));
      if (clicked !== isLiked) {
        setClicked(type === "post" ? postId! : commentId!, isLiked);
      }
    }
  }, [userId, likes, clicked, setClicked, postId, commentId, type]);

  const lastClickTime = useRef<number>(0);

  const handleClick = async () => {
    const now = Date.now();
    if (now - lastClickTime.current >= 1000) {
      if (userId) {
        try {
          if (!clicked) {
            console.log("like", type);
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/posts/${postId}${
                type === "post" ? `` : `/comments/${commentId}`
              }/likes`,
              { userId }
            );
            updateLikes(
              type === "post" ? postId! : commentId!,
              response.data.data.likeData
            );

            console.log(response.data.data.likeData);
          } else {
            console.log("unlike", type);
            const response = await axios.delete(
              `${process.env.REACT_APP_API_URL}/api/posts/${postId}${
                type === "post" ? `` : `/comments/${commentId}`
              }/likes`,
              {
                headers: { "user-id": userId },
              }
            );
            updateLikes(
              type === "post" ? postId! : commentId!,
              response.data.data.likeData
            );

            console.log(response.data.data.likeData);
          }
        } catch (error) {
          console.error("Error processing the like/unlike action", error);
        }
      }
      setClicked(type === "post" ? postId! : commentId!, !clicked);
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
