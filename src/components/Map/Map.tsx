import React, { useState } from 'react';
import styled from 'styled-components';
import MapDisplay from './MapDisplay';
import SideBar from '../SideBar/SideBar';
import { useAtomValue } from 'jotai';
import { searchStrAtom } from 'stores/map';
import KakaoKeywordMap from './MapTest';

const MapContainer: React.FC = () => {
  const searchPlace = useAtomValue(searchStrAtom)
  const [places, setPlaces] = useState<any[]>([]);

  return (
    <div style={{ display: 'flex' }}>
      <KakaoKeywordMap/>
    <SideBarBox>
    {/* <div style={{ display: 'flex' }}>
      <ResultWrapper>
        <div id="result-list">
          {places.map((item: any, i) => (
            <ResultBox key={i}>
              <span>{i + 1}</span>
              <div>
                <h5>{item.place_name}</h5>
                {item.road_address_name ? (
                  <div>
                    <span>{item.road_address_name}</span>
                    <span>{item.address_name}</span>
                  </div>
                ) : (
                  <span>{item.address_name}</span>
                )}
                <span>{item.phone}</span>
              </div>
            </ResultBox>
          ))}
          <div id="pagination" style={{backgroundColor:'black',position:'sticky',bottom:0}}></div>
        </div>
      </ResultWrapper>
    </div> */}
    </SideBarBox>
    {/* <MapDisplay searchPlace={searchPlace ? searchPlace :''} setPlaces={setPlaces} /> */}
    </div>
  );
};
export const SideBarBox = styled.div`
  height: 90%;
  border-radius: 20px;
`;
export const ResultWrapper = styled.div`
  height: 25rem;
  overflow: auto;
  border: 1px solid red;
`;

export const ResultBox = styled.div`
  border: 1px solid black;
`;

export const MapWrapper = styled.div`
  border: 1px solid black;
  .myMap {
    width: 500px;
    height: 500px;
  }
`;

export default MapContainer;
