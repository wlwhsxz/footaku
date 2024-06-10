import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import useFollow from "../../hooks/useFollow";
import LeftSidebar from "../../components/common/leftSidebar/LeftSidebar";

const FollowButton = lazy(
  () => import("../../components/common/buttons/FollowButton")
);

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
  const formattedClubName = clubName && clubName.replaceAll("_", " ");
  const [clubDetails, setClubDetails] = useState<ClubDetailsType | null>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<VideoItem[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastVideoElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchYouTubeVideos();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, nextPageToken]
  );

  const user = useAuthStore((state) => state.user);
  const userId = user?.userId;

  const { isFollowing, toggleFollow } = useFollow(formattedClubName!, userId);

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

  const fetchYouTubeVideos = async () => {
    if (
      clubDetails?.youtube.playlistId &&
      (nextPageToken || nextPageToken === null)
    ) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_YOUTUBE_API_URL}/playlistItems`,
          {
            params: {
              part: "snippet",
              playlistId: clubDetails.youtube.playlistId,
              maxResults: 9,
              pageToken: nextPageToken,
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
            },
          }
        );
        setYoutubeVideos((prevVideos) => [...prevVideos, ...data.items]);
        setNextPageToken(data.nextPageToken);
        setHasMore(data.items.length > 0);
      } catch (error) {
        console.error("Error fetching playlist videos:", error);
      }
    }
  };

  useEffect(() => {
    fetchYouTubeVideos();
  }, [clubDetails?.youtube.playlistId]);

  return (
    <ClubPageLayout>
      <LeftSidebar />
      <ClubContainer>
        <ProfileBox>
          <ProfileImgBox>
            {clubDetails && clubDetails.image ? (
              <picture>
                <source
                  srcSet={clubDetails.image.replace(".jpg", ".webp")}
                  type="image/webp"
                />
                <img
                  src={clubDetails.image}
                  alt={clubDetails.name}
                  width="150"
                  height="150"
                  style={{ aspectRatio: "1/1" }}
                />
              </picture>
            ) : (
              <Placeholder width={150} height={150} />
            )}
          </ProfileImgBox>
          <BioBox>
            <BioHeader>
              <h2>{clubDetails?.name}</h2>
              <Suspense fallback={<div>Loading...</div>}>
                <FollowButton
                  isFollowing={isFollowing}
                  onClick={toggleFollow}
                />
              </Suspense>
            </BioHeader>
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
                width="30"
                height="30"
                style={{ aspectRatio: "1/1" }}
              />
              <StyledImg
                onClick={() => window.open(`${clubDetails?.youtube.url}`)}
                src="/youtube.png"
                alt="YouTube"
                width="30"
                height="30"
                style={{ aspectRatio: "1/1" }}
              />
              <StyledImg
                onClick={() =>
                  window.open(
                    `https://www.transfermarkt.com${clubDetails?.url}`
                  )
                }
                src="/tm.jpg"
                alt="Transfermarkt"
                width="30"
                height="30"
                style={{ aspectRatio: "1/1" }}
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
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "active" : ""
              }
            >
              Youtube
            </StyledNavLink>
          )}

          <StyledNavLink
            to={`/club/${clubDetails?.name
              .toLowerCase()
              .split(" ")
              .join("_")}/news`}
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "active" : ""
            }
          >
            News
          </StyledNavLink>
          <StyledNavLink
            to={`/${clubDetails?.name
              .toLowerCase()
              .split(" ")
              .join("_")}/social_media`}
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? "active" : ""
            }
          >
            Social Media
          </StyledNavLink>
        </TabBox>
        <PostBox>
          {youtubeVideos.map((item, index) => (
            <PostImg
              key={item.snippet.resourceId.videoId}
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
                )
              }
              src={`https://i.ytimg.com/vi/${item.snippet.resourceId.videoId}/hqdefault.jpg`}
              width="300"
              height="200"
              alt="YouTube Video Thumbnail"
              loading="lazy"
              style={{ aspectRatio: "4/3" }}
              ref={
                index === youtubeVideos.length - 1 ? lastVideoElementRef : null
              }
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
    object-fit: cover;
  }
`;

const Placeholder = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: #ccc;
`;

const StyledImg = styled.img`
  width: 30px;
  height: auto;
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

const BioHeader = styled.div`
  display: flex;
  align-items: center;
`;

const TabBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  aspect-ratio: 10/1;

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

  width: 100%;
  height: auto;
  min-height: 200px;
`;

const PostImg = styled.img`
  width: 32%;
  height: auto;
  margin-bottom: 1px;
  margin-right: 1px;
  aspect-ratio: 4/3;

  &:hover {
    cursor: pointer;
    width: 33%;
  }
`;
