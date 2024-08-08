import TabBar from ".././components/TabBar/TabBar";
import React, { useState, useEffect } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import "./Map.css";
import SideBar from "components/SideBar/SideBar";
import { searchAllAtom, selectItemAtom } from "stores/map";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { setmodalAtom } from "stores/modal";
import ModalBox from "components/Modal/ModalBox";
import { favPlaceAtom } from "stores/search";
import PlacesList from "components/Content/MapList";
import MapOverlay from "components/Content/MapOverlay";
import special from "../assets/special2.png";
import list from "../assets/list.png";
import styled from "styled-components";
import marker from '../assets/marker.png'
import warn from '../assets/warn.png'
import ExceptionComponent from "components/Exception/SearchException";
import { type } from "os";
function MapPage() {
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [message, setMessage] = useState(false);
  const [modalOpen, setModalOpen] = useAtom(setmodalAtom);
  const setFavPlace = useSetAtom(favPlaceAtom);
  const [flag, setFlag] = useState(false);
  const keyword = useAtomValue(searchAllAtom);
  const setSelectedPlace = useSetAtom(selectItemAtom);
  const modalHandler = () => {
    setModalOpen(true);
  };
  const imageSize = { width: 36, height: 37 };
  const spriteSize = { width: 36, height: 691 };
  const defaultCenter = {
    lat: 37.51087446314432,
    lng: 127.04499074830632,
  };
  useEffect(() => {
    if (!map) return;
    if (keyword == null) {
      setMessage(true);
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      keyword,
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];
          for (var i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: parseFloat(data[i].y),
                lng: parseFloat(data[i].x),
              },
              content: data[i].place_name,
              address: data[i].address_name,
              phone: data[i].phone,
              road: data[i].road_address_name,
            });
            bounds.extend(
              new kakao.maps.LatLng(
                parseFloat(data[i].y),
                parseFloat(data[i].x)
              )
            );
          }
          setMarkers(markers);
          map.setBounds(bounds);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setFlag(true);
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      },
      {
        radius: 5000,
        location: new kakao.maps.LatLng(defaultCenter.lat, defaultCenter.lng),
      }
    );
    setFlag(false);
  }, [map, keyword, message]);
  const EventMarkerContainer = ({
    position,
    content,
    i,
    address,
    phone,
    road,
  }: any) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);
//검색 예외처리
    type ExceptionComponentProps = {
      imageSrc: string;
      altText: string;
      message: string;
      messageTitle: string;
      imageWidth?: string;
    }
    
    const ExceptionComponent: React.FC<ExceptionComponentProps> = ({
      imageSrc,
      altText,
      message,
      messageTitle,
      imageWidth = "170px",
    }) => {
      return (
        <ExceptionWrapper>
          <Image src={imageSrc} alt={altText} style={{ width: imageWidth }} />
          <Message>{message}</Message>
          <MessageTitle>{messageTitle}</MessageTitle>
        </ExceptionWrapper>
      );
    };

    return (
      <MapMarker
        position={position}
        image={{
          src: list,
          size: imageSize,
          options: {
            spriteSize: spriteSize,
            spriteOrigin: new kakao.maps.Point(0, i * 46 + 10),
            offset: new kakao.maps.Point(13, 37),
          },
        }}
        onClick={(marker) => {
          map.panTo(marker.getPosition());
          setSelectedPlace(places[i]);
        }}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && (
          <MapOverlay
            content={content}
            address={address}
            phone={phone}
            road={road}
          />
        )}
      </MapMarker>
    );
  };
  return (
    <>
      <TabBar />
      <div className="map_wrap">
        {modalOpen ? <ModalBox /> : ""}
        <Map
          center={defaultCenter}
          style={{
            width: "100%",
            height: "100vh",
          }}
          level={3}
          onCreate={setMap}
        >
          {(keyword || places.length === 0 || places.length !== 0) && (
            <MapMarker
              position={defaultCenter}
              image={{
                src: special,
                size: { width: 64, height: 69 },
              }}
            />
          )}
          {markers.map((marker, i) => (
            <EventMarkerContainer
              key={`EventMarkerContainer-${marker.position.lat}-${marker.position.lng}`}
              position={marker.position}
              content={marker.content}
              address={marker.address}
              phone={marker.phone}
              i={i}
              road={marker.road}
            />
          ))}
        </Map>
        <div id="menu_wrap" className="bg_white">
          <SideBar />
          <hr />
          {!keyword && <ExceptionComponent
  imageSrc={marker}
  altText="마커"
  message="아직 검색이 존재하지 않아요"
  messageTitle="이름이나 주소로 검색해 보세요!"
/>}
          {keyword && flag && <ExceptionComponent
      imageSrc={warn}
      altText="경고"
      message="검색 결과가 존재하지 않아요"
      messageTitle="다른 키워드로 검색해 보세요!"
    />
}
          {keyword && !flag && (
            <PlacesList
              places={places}
              map={map}
              markers={markers}
              setSelectedPlace={setSelectedPlace}
              setFavPlace={setFavPlace}
              modalHandler={modalHandler}
            />
          )}
          <div id="pagination"></div>
        </div>
      </div>
    </>
  );
}
const ExceptionWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Image = styled.img`
  width: 170px;
  height: auto;
  margin-bottom: 2rem;
`;

const Message = styled.div`
  font-family: pretendard;
  font-weight: 600;
  font-size: 16px;
  color: #939393;
  margin-bottom: 0.4rem;
  font-weight: 800;
`;

const MessageTitle = styled.div`
  font-family: pretendard;
  font-size: 23px;
  font-weight: 800;
  color: #505050;
`;
export default MapPage;
