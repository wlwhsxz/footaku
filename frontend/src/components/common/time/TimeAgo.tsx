import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface TimeAgoProps {
  date: Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  dayjs.extend(relativeTime);
  const timeAgo = dayjs(date).fromNow();

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
