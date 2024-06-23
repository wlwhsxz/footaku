import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
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
    }, 500);

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
    <SearchBarContainer $visible={visible}>
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

const slideIn = keyframes`
  from {
    transform: translateX(-10%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const SearchBarContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 140px;
  width: 397px;
  height: 100vh;

  justify-content: center;

  padding: 8px 0;

  background: white;
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.5);

  transform: translateX(${(props) => (props.$visible ? "0" : "-100%")});
  animation: ${(props) => (props.$visible ? slideIn : slideOut)} 0.5s forwards;

  @media (max-width: 768px) {
    left: 80px;
  }
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
  padding: 25px 14px 36px 24px;
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
