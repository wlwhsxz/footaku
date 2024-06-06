import axios from "axios";

export const handleFollowButtonClick = async (
  clubName,
  isFollowing,
  setIsFollowing
) => {
  const formattedClubName = clubName.replaceAll("_", " ");

  try {
    if (isFollowing) {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/clubs/${formattedClubName}/follow`,
        { withCredentials: true }
      );
    } else {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/clubs/${formattedClubName}/follow`,
        {},
        { withCredentials: true }
      );
    }
    setIsFollowing(!isFollowing);
  } catch (error) {
    console.error("Error following/unfollowing club:", error);
  }
};
