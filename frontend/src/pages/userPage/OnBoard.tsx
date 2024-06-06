import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import ClubCard from "../../components/club/ClubCard";

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

const OnBoard = () => {
  const [clubData, setClubData] = useState<ClubDataType[]>([]);
  const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const user = useAuthStore((state) => state.user);
  const userId = user?.userId;
  const setFirstLoggedIn = useAuthStore((state) => state.setFirstLoggedIn);
  const navigate = useNavigate();

  const fetchClubData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/clubs`
      );
      setClubData(response.data.data);
    } catch (error) {
      console.error("Error fetching club data:", error);
    }
  };

  useEffect(() => {
    fetchClubData();
  }, []);

  const handleFollowChange = (clubId: string, isFollowing: boolean) => {
    setFollowStatus((prevStatus) => ({ ...prevStatus, [clubId]: isFollowing }));
  };

  const isAnyFollowing = Object.values(followStatus).some(
    (isFollowing) => isFollowing
  );

  const handleCompleteClick = () => {
    setFirstLoggedIn(false);
    navigate("/");
  };

  return (
    <OnBoardContainer>
      <ClubGrid>
        {clubData.map((club) => (
          <ClubCard
            key={club._id}
            club={club}
            userId={userId}
            onFollowChange={handleFollowChange}
          />
        ))}
      </ClubGrid>
      <StyledButton disabled={!isAnyFollowing} onClick={handleCompleteClick}>
        완료
      </StyledButton>
    </OnBoardContainer>
  );
};

export default OnBoard;

const OnBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ClubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledButton = styled.button`
  width: 50%;
  text-align: center;
  margin-top: 50px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #6ab2ff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #037bfc;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
