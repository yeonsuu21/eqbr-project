import React from "react";
import styled from "styled-components";
import Search from "../Search/Search";
import Category from "../Category/Category";
function SideBar() {
  return (
    <SideBarWrapper>
      <Search />
      <Category />
    </SideBarWrapper>
  );
}

export const SideBarWrapper = styled.div`
  top: 0;
  z-index: 1000000;
  width: 23rem;
`;
export default SideBar;
