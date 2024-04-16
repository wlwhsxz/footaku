import React from "react";
import styled from "styled-components";

const SearchResult = () => {
  return (
    <SearchResultContainer>
      <ProfileBox>
        <ResultImgBox>
          <img src="asds" />
        </ResultImgBox>
        <span>hm_son7</span>
      </ProfileBox>
      <ProfileBox>
        {" "}
        <ResultImgBox>
          <img src="asds" />
        </ResultImgBox>
        <span>hm_son7</span>
      </ProfileBox>
      <ProfileBox>
        <ResultImgBox>
          <img src="asds" />
        </ResultImgBox>
        <span>hm_son7</span>
      </ProfileBox>
    </SearchResultContainer>
  );
};

export default SearchResult;

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 8px 24px;
  font-size: 20px;
`;

const ProfileBox = styled.div`
  display: flex;
`;

const ResultImgBox = styled.span`
  width: 56px;

  img {
    width: 44px;
    height: 44px;
  }
`;
