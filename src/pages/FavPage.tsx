import React, { useEffect, useState } from "react";
import TabBar from "../../src/components/TabBar/TabBar";
import FavList from "components/Fav/FavList";
import FavMap from "components/Map/FavMap";
import styled from "styled-components";

function FavPage() {
  return (
    <div>
      <TabBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FavPageWrapper>
          <FavList />
          <FavMap />
        </FavPageWrapper>
      </div>
    </div>
  );
}

export const FavPageWrapper = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
`;

export default FavPage;
