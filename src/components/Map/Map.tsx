import React, { useState } from "react";
import styled from "styled-components";
import { useAtomValue } from "jotai";
import { searchStrAtom } from "stores/map";
import KakaoKeywordMap from "./MapTest";

const MapContainer: React.FC = () => {
  const searchPlace = useAtomValue(searchStrAtom);

  return (
    <div style={{ display: "flex" }}>
      <KakaoKeywordMap />
    </div>
  );
};

export default MapContainer;
