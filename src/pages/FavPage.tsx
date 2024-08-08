import TabBar from "../../src/components/TabBar/TabBar";
import styled from "styled-components";
import FavContent from "../components/Content/FavContent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FavListExcept from "components/Exception/FavListExcept";
import { favListArrayAtom } from "stores/favorite";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useAtomValue } from "jotai";
import FavMapExcept from "components/Exception/FavMapExcept";
import MapOverlay from "components/Content/MapOverlay";
import {
  latitudeAtom,
  longitudeAtom,
  selectAdressAtom,
  selectContentAtom,
  selectFavPhoneAtom,
  selectFavSubAdrAtom,
} from "stores/favorite";

function FavPage() {
  const [parsedItem, setParsedItem] = useAtom(favListArrayAtom);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const latitude = useAtomValue(latitudeAtom);
  const longitude = useAtomValue(longitudeAtom);
  const content = useAtomValue(selectContentAtom);
  const adress = useAtomValue(selectAdressAtom);
  const subAdr = useAtomValue(selectFavSubAdrAtom);
  const phone = useAtomValue(selectFavPhoneAtom);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, parsedItem.length));
  };

  const moveFavContent = (fromIndex: number, toIndex: number) => {
    const updatedItems = [...parsedItem];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setParsedItem(updatedItems);
    localStorage.setItem("select", JSON.stringify(updatedItems));
  };

  useEffect(() => {
    const item = localStorage.getItem("select");
    if (item) {
      try {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed)) {
          setParsedItem(parsed);
        } else {
          console.error("배열이 아닙니다");
        }
      } catch (error) {
        console.error("오류", error);
      }
    }
  }, [setParsedItem]);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setPosition({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);

  return (
    <>
      <TabBar />
      <FavPageWrapper>
        <DndProvider backend={HTML5Backend}>
          <FavListWrapper>
            {parsedItem.length === 0 ? (
              <EmptyMessage>
                <FavListExcept />
              </EmptyMessage>
            ) : (
              <>
                {parsedItem.slice(0, visibleCount).map((item, index) => (
                  <FavContent
                    key={index}
                    item={item}
                    index={index}
                    moveFavContent={moveFavContent}
                  />
                ))}
                {visibleCount < parsedItem.length && (
                  <ShowMoreButton onClick={handleShowMore}>
                    더보기
                  </ShowMoreButton>
                )}
              </>
            )}
          </FavListWrapper>
        </DndProvider>
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
              <MapMarker
                position={position}
                onMouseOver={() => setIsVisible(true)}
                onMouseOut={() => setIsVisible(false)}
              >
                {isVisible && (
                  <MapOverlay
                    content={content}
                    address={adress}
                    phone={phone}
                    road={subAdr}
                  />
                )}
              </MapMarker>
            </Map>
          ) : (
            <NoSelectionMessage>
              <FavMapExcept />
            </NoSelectionMessage>
          )}
        </FavMapWrapper>
      </FavPageWrapper>
    </>
  );
}

export const FavPageWrapper = styled.div`
  width: 80%;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10rem;
`;

export const FavListWrapper = styled.div`
  padding: 1rem 0;
  width: 45rem;
  height: 44rem;
  border: 1px solid #efefef;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-top: 3rem;
  border-radius: 40px;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  align-items: center;
`;

export const ShowMoreButton = styled.button`
  width: 70%;
  padding: 1rem 0;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-weight: 700;
  border-radius: 0 0 30px 30px;
  margin-bottom: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`;

export const EmptyMessage = styled.div`
  font-size: 1.5rem;
  color: #333;
`;

export const FavMapWrapper = styled.div`
  width: 50rem;
  height: 46rem;
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

export default FavPage;