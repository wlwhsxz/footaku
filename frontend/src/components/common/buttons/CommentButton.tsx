import React from "react";

type CommentButtonProps = {
  onCommentClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const CommentButton: React.FC<CommentButtonProps> = ({ onCommentClick }) => {
  return (
    <div onClick={onCommentClick}>
      <img src="https://cdn-icons-png.flaticon.com/128/54/54467.png" />
    </div>
  );
};

export default CommentButton;
