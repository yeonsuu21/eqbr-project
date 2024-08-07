import { useAtom } from "jotai";
import React, { useEffect } from "react";
import {
  categoryHistoryAtom,
  categoryStrAtom,
  searchAllAtom,
  searchStrAtom,
} from "stores/map";
import styled from "styled-components";

const initialCategories = ["카페", "음식점", "편의점", "주차장", "은행"];

function Category() {
  const [selectedCategory, setSelectedCategory] = useAtom(categoryStrAtom);
  const [searchStr] = useAtom(searchStrAtom);
  const [searchHistory, setSearchHistory] = useAtom(categoryHistoryAtom);
  const [searchAll, setSearchAll] = useAtom(searchAllAtom);

  useEffect(() => {
    if (searchStr && !searchHistory.includes(searchStr)) {
      setSearchHistory((prevHistory) => [searchStr, ...prevHistory]);
    }
  }, [searchStr]);

  const displayCategories = [...searchHistory, ...initialCategories];

  const handleCategoryClick = (category: string) => {
    setSearchAll(category);
    setSelectedCategory(category);
  };

  return (
    <CategWrapper>
      {displayCategories.map((category, index) => (
        <CategBox key={index} onClick={() => handleCategoryClick(category)}>
          {category}
        </CategBox>
      ))}
    </CategWrapper>
  );
}

export const CategWrapper = styled.div`
  padding: 0.5rem;
  height: 3rem;
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: center;
`;

export const CategBox = styled.div`
  color: #505050;
  width: 4rem;
  height: 2.2rem;
  border-radius: 25px;
  margin-right: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: #d9d9d9;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    background-color: #0064ff;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default Category;
