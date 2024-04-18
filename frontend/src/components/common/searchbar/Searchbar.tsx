import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";
import axios from "axios";

interface SearchProps {
  visible: boolean;
}

const SearchBar: React.FC<SearchProps> = ({ visible }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) {
        setSearching(true);
        searchHandler(searchQuery);
      }
    }, 500); // Delay the search function 1000 ms

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const searchHandler = async (query: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/clubs/${query}`
      );
      setSearchResult(response.data.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setSearchResult([]);
    }
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBox>
        <SearchResultBox>
          {searchQuery !== "" && <SearchResult searchResult={searchResult} />}
        </SearchResultBox>
      </SearchContentBox>
    </SearchBarContainer>
  );
};

export default SearchBar;

// Styled components remain unchanged

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
    background-color: rgb(0, 0, 0, 0.1);
    border-radius: 10px;
    border-width: 0px;
  }
`;

const SearchResultBox = styled.div`
  width: 100%;

  border-top: 1px solid grey;
`;
