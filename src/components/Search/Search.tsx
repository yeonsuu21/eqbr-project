import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { searchAllAtom, searchBtnAtom, searchStrAtom } from "stores/map";
import { searchActBtnAtom } from "stores/search";
import styled from "styled-components";
function Search() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [searchStr, setSearchStr] = useAtom(searchStrAtom);
  const [resultLoad, setResultLoad] = useAtom(searchBtnAtom);
  const [actBtn, setActBtn] = useAtom(searchActBtnAtom);
  const [searchAll, setSearchAll] = useAtom(searchAllAtom);
  const keyword = useAtom(searchAllAtom);
  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setSearch(e.target.value);
    setResult(e.target.value);
  };
  //키워드 입력 시 버튼 활성화
  useEffect(() => {
    if (search.trim() !== "") {
      setActBtn(true);
    } else {
      setActBtn(false);
    }
  }, [search, setActBtn]);

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
  return (
    <div>
      <SearchWrapper>
        <SearchInput
          placeholder="키워드를 입력해주세요"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={result}
        />
        {actBtn ? (
          <SearchBtnAct onClick={ClickBtn}>검색</SearchBtnAct>
        ) : (
          <SearchBtn>검색</SearchBtn>
        )}
      </SearchWrapper>
    </div>
  );
}
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
  padding-left: 1rem;
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
export default Search;
