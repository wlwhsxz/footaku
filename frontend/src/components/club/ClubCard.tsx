import React, { useEffect } from "react";
import styled from "styled-components";
import FollowButton from "../../components/common/buttons/FollowButton";
import useFollow from "../../hooks/useFollow";

interface ClubDataType {
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

interface ClubCardProps {
  club: ClubDataType;
  userId: string | undefined;
  onFollowChange: (clubId: string, isFollowing: boolean) => void;
}

const ClubCard: React.FC<ClubCardProps> = ({
  club,
  userId,
  onFollowChange,
}) => {
  const { isFollowing, toggleFollow } = useFollow(club.name, userId);

  useEffect(() => {
    onFollowChange(club._id, isFollowing);
  }, [isFollowing]);

  return (
    <Card>
      <img src={club.image} alt={club.name} />
      <h3>{club.name}</h3>
      <p>
        {club.league.countryName} - {club.league.name}
      </p>
      <p>{club.stadiumName}</p>
      <p>
        {club.addressLine1}, {club.addressLine2}, {club.addressLine3}
      </p>
      <p>{club.description}</p>
      <a
        href={`https://${club.website}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Website
      </a>
      <a href={club.youtube.url} target="_blank" rel="noopener noreferrer">
        YouTube
      </a>
      <a
        href={`https://www.transfermarkt.com${club.url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Transfermarkt
      </a>
      <FollowButtonContainer>
        <FollowButton isFollowing={isFollowing} onClick={toggleFollow} />
      </FollowButtonContainer>
    </Card>
  );
};

export default ClubCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    margin: 10px 0;
  }

  p {
    margin: 5px 0;
  }

  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FollowButtonContainer = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  border-top: 1px solid #ccc;
`;
