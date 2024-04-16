import React, { useState } from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";
import axios from "axios";

interface SearchProps {
  visible: boolean;
}

const SearchBar: React.FC<SearchProps> = ({ visible }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const searchHandler = async (query: string) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/clubs/${query}`
    );

    console.log(response.data.data);
    setSearching(true);
  };

  if (!visible) return null;

  return (
    <SearchBarContainer>
      <SearchHeaderBox>Search</SearchHeaderBox>
      <SearchContentBox>
        <SearchBox>
          <input
            placeholder="Search"
            value={searchQuery}
            onChange={async (e) => {
              setSearchQuery(e.target.value);
              searchHandler(e.target.value);
              console.log(e.target.value);
            }}
          />
        </SearchBox>
        <SearchResultBox>
          <SearchResult />
        </SearchResultBox>
      </SearchContentBox>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  width: 397px;
  height: 100vh;

  justify-content: center;

  padding: 8px 0;
`;

const SearchContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchHeaderBox = styled.div`
  font-size: 24px;
  font-weight: 600;

  margin: 8px 0;
  padding: 12px 14px 36px 24px;
`;

const SearchBox = styled.div`
  width: 364px;
  height: 64px;

  input {
    font-size: 16px;

    width: 100%;
    height: 40px;
    padding: 3px 16px;
    margin: 4px 0;
    box-sizing: border-box;
  }
`;

const SearchResultBox = styled.div`
  width: 100%;

  border-top: 1px solid grey;
`;
