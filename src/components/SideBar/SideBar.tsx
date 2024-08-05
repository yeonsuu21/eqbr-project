import React from 'react'
import styled from "styled-components";
import Search from '../Search/Search';
import Category from '../Category/Category';
function SideBar() {
  return (
    <SideBarWrapper>
        <Search/>
        <Category/>
    </SideBarWrapper>
  )
}

export const SideBarWrapper = styled.div`
border: 1px solid black;
width: 23rem;
margin-bottom: 1rem;
`
export default SideBar
