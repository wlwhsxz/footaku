import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface SearchResultProps {
  searchResult: any[];
}

const SearchResult: React.FC<SearchResultProps> = ({ searchResult }) => {
  return (
    <SearchResultContainer>
      {searchResult.length > 0 ? (
        searchResult.map((item) => (
          <StyledLink
            to={`/club/${item.name.toLowerCase().split(" ").join("_")}`}
            state={{ clubDetails: item }}
            key={item._id}
          >
            <ProfileBox>
              <ResultImgBox>
                <img src={item.image} alt={item.name} />
              </ResultImgBox>
              <ResultNameBox>{item.name}</ResultNameBox>
            </ProfileBox>
          </StyledLink>
        ))
      ) : (
        <p>검색된 결과가 없습니다.</p>
      )}
    </SearchResultContainer>
  );
};

export default SearchResult;

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: black;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0;
  &:hover {
    cursor: pointer;
    background-color: rgb(0, 0, 0, 0.2);
  }
`;

const ResultImgBox = styled.span`
  width: 56px;
  img {
    width: 44px;
    height: 44px;
  }
`;

const ResultNameBox = styled.div``;
