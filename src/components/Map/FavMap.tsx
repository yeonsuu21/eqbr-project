import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAtomValue } from "jotai";
import { latitudeAtom, longitudeAtom } from "stores/map";

function FavMap() {
  const latitude = useAtomValue(latitudeAtom);
  const longitude = useAtomValue(longitudeAtom);

  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setPosition({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);

  return (
    <FavMapWrapper>
      {position ? (
        <Map
          id="map"
          center={position}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "30px",
          }}
          level={3}
          onClick={(_, mouseEvent) => {
            const latlng = mouseEvent.latLng;
            setPosition({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            });
          }}
        >
          <MapMarker position={position} />
        </Map>
      ) : (
        <NoSelectionMessage>지도를 클릭해주세요!</NoSelectionMessage>
      )}
    </FavMapWrapper>
  );
}

export const FavMapWrapper = styled.div`
  width: 40rem;
  height: 40rem;
  border: 1px solid black;
  margin-left: 6rem;
  margin-top: 3rem;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoSelectionMessage = styled.div`
  font-size: 1.5rem;
  color: #333;
`;

export default FavMap;