import { useState, useEffect } from "react";
import axios from "axios";

const useFollow = (clubName: string, userId: string | undefined) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/clubs/${clubName}`
        );

        // 데이터 유효성 검사
        if (data && data.data && data.data.length > 0 && data.data[0].followers)
          setIsFollowing(data.data[0].followers.includes(userId));
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    checkFollowStatus();
  }, [clubName, userId]);

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await axios
          .delete(
            `${process.env.REACT_APP_API_URL}/api/clubs/${clubName}/follow`,
            { withCredentials: true }
          )
          .then((res) => console.log(res));
      } else {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/clubs/${clubName}/follow`,
            {},
            { withCredentials: true }
          )
          .then((res) => console.log(res));
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error following/unfollowing club:", error);
    }
  };

  return { isFollowing, toggleFollow };
};

export default useFollow;
