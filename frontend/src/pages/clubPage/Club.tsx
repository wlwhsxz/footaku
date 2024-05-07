import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import LeftSidebar from "../../components/common/leftSidebar/LeftSidebar";
interface VideoItem {
  snippet: {
    resourceId: {
      videoId: string;
    };
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

interface YouTubeVideoResponse {
  items: VideoItem[];
}

interface ClubDetailsType {
  name: string;
  image: string;
  league: {
    countryName: string;
    name: string;
  };
  stadiumName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  description: string;
  website: string;
  youtube: {
    playlistId: string;
    url: string;
  };
  url: string;
  _id: string;
}

const Club = () => {
  const { clubName } = useParams<{ clubName: string }>();
  const formattedClubName = clubName && clubName.replace("_", " ");

  const [clubDetails, setClubDetails] = useState<ClubDetailsType | null>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideoResponse>({
    items: [],
  });

  // 클럽 정보를 가져오는 useEffect
  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/clubs/${formattedClubName}`
        );
        setClubDetails(data.data[0]);
      } catch (error) {
        console.error("Error fetching club details:", error);
      }
    };

    fetchClubDetails();
  }, [formattedClubName]);

  // YouTube 비디오를 가져오는 useEffect
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      if (clubDetails?.youtube.playlistId) {
        try {
          const { data } = await axios.get<YouTubeVideoResponse>(
            `${process.env.REACT_APP_YOUTUBE_API_URL}/playlistItems?part=snippet&playlistId=${clubDetails.youtube.playlistId}&maxResults=48&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
          );
          setYoutubeVideos(data);
        } catch (error) {
          console.error("Error fetching playlist videos:", error);
        }
      }
    };

    fetchYouTubeVideos();
  }, [clubDetails?.youtube.playlistId]);

  return (
    <ClubPageLayout>
      <LeftSidebar />
      <ClubContainer>
        <ProfileBox>
          <ProfileImgBox>
            {clubDetails && clubDetails.image && (
              <img src={clubDetails?.image} alt={clubDetails?.name} />
            )}
          </ProfileImgBox>
          <BioBox>
            <div>
              <h2>{clubDetails?.name}</h2>
            </div>
            <div>
              {`${clubDetails?.league.countryName} - ${clubDetails?.league.name}`}
            </div>
            <div>{clubDetails?.stadiumName}</div>
            <div>
              {`${clubDetails?.addressLine1}, ${clubDetails?.addressLine2}, 
              ${clubDetails?.addressLine3}`}
            </div>

            <div>{clubDetails?.description}</div>
            <div>
              <StyledImg
                onClick={() => window.open(`https://${clubDetails?.website}`)}
                src={clubDetails?.image}
                alt={clubDetails?.website}
              />
              <StyledImg
                onClick={() => window.open(`${clubDetails?.youtube.url}`)}
                src="/youtube.png"
                alt="YouTube"
              />
              <StyledImg
                onClick={() =>
                  window.open(
                    `https://www.transfermarkt.com${clubDetails?.url}`
                  )
                }
                src="/tm.jpg"
                alt="Transfermarkt"
              />
            </div>
          </BioBox>
        </ProfileBox>
        <TabBox>
          {clubDetails && clubDetails.name && (
            <StyledNavLink
              to={`/club/${clubDetails.name
                .toLowerCase()
                .split(" ")
                .join("_")}`}
              state={{ clubDetails }}
              key={clubDetails._id}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Youtube
            </StyledNavLink>
          )}

          <StyledNavLink
            to={`/club/${clubDetails?.name
              .toLowerCase()
              .split(" ")
              .join("_")}/news`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            News
          </StyledNavLink>
          <StyledNavLink
            to={`/${clubDetails?.name
              .toLowerCase()
              .split(" ")
              .join("_")}/social_media`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Social Media
          </StyledNavLink>
        </TabBox>
        <PostBox>
          {youtubeVideos.items.map((item) => (
            <PostImg
              key={item.snippet.resourceId.videoId}
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
                )
              }
              src={`https://i.ytimg.com/vi/${item.snippet.resourceId.videoId}/hqdefault.jpg`}
              width={300}
              height={200}
              alt="YouTube Video Thumbnail"
            />
          ))}
        </PostBox>
      </ClubContainer>
    </ClubPageLayout>
  );
};

export default Club;

const ClubPageLayout = styled.div`
  display: flex;
`;

const ClubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 935px;

  margin: 0px auto 30px auto;
  padding: 30px 20px 0px;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: left;

  width: 100%;

  margin: 0 0 40px;
`;

const ProfileImgBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 0;

  justify-content: center;
  margin: 0px 30px 0px 0px;

  img {
    width: 150px;
    height: 150px;
    border: 1px double rgb(150, 150, 150);
    border-radius: 100%;
    padding: 8px;
  }
`;

const StyledImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  &:hover {
    cursor: pointer;
  }
`;

const BioBox = styled.div`
  flex-grow: 2;
  flex-basis: 30px;
  flex-shrink: 1;
  justify-content: center;
`;

const TabBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 52px;

  border-top: 1px solid rgb(219, 219, 219);
`;

const StyledLink = styled(Link)`
  margin: 0 60px 0 0;
  text-decoration: none;
  color: black;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 100%;

  margin: 0 60px 0 0;
  text-decoration: none;
  font-weight: 500;
  color: rgb(155, 155, 155);
  box-sizing: border-box;

  &.active {
    font-weight: bold;
    border-top: 1px solid black;
    color: black;
  }
`;

const PostBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PostImg = styled.img`
  width: 33%;
  height: auto;
  margin-bottom: 1px;
  margin-right: 1px;

  &:hover {
    cursor: pointer;
    width: 33.3%;
  }
`;
