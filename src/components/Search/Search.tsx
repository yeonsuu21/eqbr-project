import { useAtom } from 'jotai';
import React, { useState } from 'react'
import { searchBtnAtom, searchStrAtom } from 'stores/map';
import styled from "styled-components";
function Search() {
    const [search , setSearch] =useState('')
    const [searchStr , setSearchStr] = useAtom(searchStrAtom)
    const [resultLoad , setResultLoad] = useAtom(searchBtnAtom)
    const handleInputChange =(e: React.ChangeEvent<any>)=>{
        setSearch(e.target.value);
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        ClickBtn();
      }
    };
    const ClickBtn=() => {
        setSearchStr(search)
        setResultLoad(true)
    }
    console.log(searchStr)
  return (
    <div>
      <SearchWrapper>
        <input placeholder='키워드를 입력해주세요' onChange={handleInputChange} onKeyPress={handleKeyPress} value={search}/>
        <SearchBtn onClick={ClickBtn}>검색</SearchBtn>
      </SearchWrapper>
    </div>
  )
}
export const SearchWrapper= styled.div`
border: 1px solid black;
margin-top: 3rem;
height: 3rem;
display: flex;
justify-content: space-between;
cursor: pointer;
`
export const SearchBtn= styled.div`
cursor: pointer;
border: 1px solid red;
height: 3rem;
width: 5rem;

`
export default Search
