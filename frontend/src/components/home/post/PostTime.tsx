import React, { useState, useEffect } from "react";

interface PostTimeProps {
  pastDate: Date;
}

const PostTime: React.FC<PostTimeProps> = ({ pastDate }) => {
  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const diff = currentDate.getTime() - pastDate.getTime();

    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));

    let message;
    if (diffHours >= 48) {
      message = pastDate.toString().split(" ").slice(1, 4).join(" ");
    } else if (diffHours <= 24 && diffHours < 48) {
      message = `${diffHours} hours ago`;
    } else if (diffHours > 0) {
      message = "1 day ago";
    } else if (diffMinutes > 0) {
      message = `${diffMinutes} minutes ago`;
    } else {
      message = "just now";
    }

    setTimeDiff(message);
  }, [pastDate]);

  return <div>{timeDiff}</div>;
};

export default PostTime;
