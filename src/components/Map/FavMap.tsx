import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAtomValue } from "jotai";
import { latitudeAtom, longitudeAtom } from "stores/favorite";
import FavMapExcept from "components/Exception/FavMapExcept";

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
        <NoSelectionMessage>
          <FavMapExcept />
        </NoSelectionMessage>
      )}
    </FavMapWrapper>
  );
}

export const FavMapWrapper = styled.div`
  width: 40rem;
  height: 36.8rem;
  border: 1px solid #efefef;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
