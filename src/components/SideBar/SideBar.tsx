import styled, { css } from "styled-components";
import { useAtom, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { searchActBtnAtom } from "stores/search";
import {
  searchBtnAtom,
  categoryHistoryAtom,
  categoryStrAtom,
  searchAllAtom,
  searchStrAtom,
} from "stores/map";
function SideBar() {
  const [search, setSearch] = useState("");
  const setSearchStr = useSetAtom(searchStrAtom);
  const setResultLoad = useSetAtom(searchBtnAtom);
  const [actBtn, setActBtn] = useAtom(searchActBtnAtom);
  // //카테고리 || 키워드 결과
  const setSearchAll = useSetAtom(searchAllAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(categoryStrAtom);
  const [searchStr] = useAtom(searchStrAtom);
  const [searchHistory, setSearchHistory] = useAtom(categoryHistoryAtom);
  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setSearch(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      ClickBtn();
    }
  };

  const ClickBtn = () => {
    setSearchStr(search);
    setSearchAll(search);
    setResultLoad(true);
  };

  const initialCategories = ["음식점", "카페", "편의점", "주차장", "은행"];
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      //카테고리 선택 초기화
      setSelectedCategory("");
      setSearchAll("");
      window.location.reload();
    } else {
      setSelectedCategory(category);
      setSearchAll(category);
    }
  };

  useEffect(() => {
    if (search.trim() !== "") {
      setActBtn(true);
    } else {
      setActBtn(false);
    }
  }, [search, setActBtn]);
  useEffect(() => {
    if (searchStr && !searchHistory.includes(searchStr)) {
      setSearchHistory((prevHistory) => [searchStr, ...prevHistory]);
    }
  }, [searchStr]);

  return (
    <SideBarWrapper>
      <SearchWrapper>
        <SearchInput
          placeholder="키워드를 입력해주세요"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={search}
        />
        {actBtn ? (
          <SearchBtnAct onClick={ClickBtn}>검색</SearchBtnAct>
        ) : (
          <SearchBtn>검색</SearchBtn>
        )}
      </SearchWrapper>
      {/* <Category /> */}
      <CategWrapper>
        {initialCategories.map((category, index) => (
          <CategBox
            key={index}
            onClick={() => handleCategoryClick(category)}
            selected={selectedCategory === category}
          >
            {category}
          </CategBox>
        ))}
      </CategWrapper>
    </SideBarWrapper>
  );
}

export const SideBarWrapper = styled.div`
  position: relative;
  top: 0;
  z-index: 100;
  width: 23rem;
  margin-top: 2%;
`;
export const SearchWrapper = styled.div`
  border-radius: 10px;
  margin: 1rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  height: 2.7rem;
  width: 15rem;
  padding: 0 1rem;
  font-size: 13px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
`;

export const SearchBtn = styled.div`
  height: 2.7rem;
  width: 4rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.2);
`;

export const SearchBtnAct = styled.div`
  cursor: pointer;
  height: 2.7rem;
  width: 4rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background-color: #0064ff;
  color: white;
  font-size: 14px;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.4);
`;
export const CategWrapper = styled.div`
  padding: 0.5rem;
  height: 3rem;
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: center;
`;

export const CategBox = styled.div<{ selected: boolean }>`
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
  cursor: pointer;
  ${(props) =>
    props.selected &&
    css`
      background-color: #0064ff;
      color: white;
    `}
  &:hover {
    background-color: #0064ff;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default SideBar;
