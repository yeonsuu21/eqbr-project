import React, { useState, useEffect } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import "./Map.css";
import SideBar from "components/SideBar/SideBar";
import {
  searchAllAtom,
  selectItemAtom,
} from "stores/map";
import { useAtom, useAtomValue } from "jotai";
import { setmodalAtom } from "stores/modal";
import ModalBox from "components/Modal/ModalBox";
import { favPlaceAtom } from "stores/search";
import MapException from "components/Exception/MapException";
import SearchException from "components/Exception/SearchException";
import PlacesList from "components/Content/MapList";
import MapOverlay from "components/Content/MapOverlay";

export interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const defaultCenter = {
  lat: 37.51087446314432,
  lng: 127.04499074830632,
};

function KakaoKeywordMap() {
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [message, setMessage] = useState(false);
  const [modalOpen, setModalOpen] = useAtom(setmodalAtom);
  const [favPlace, setFavPlace] = useAtom(favPlaceAtom);
  const [Add, setAdd] = useState("");
  const [flag, setFlag] = useState(false);
  const keyword = useAtomValue(searchAllAtom);
  const [selectedPlace, setSelectedPlace] = useAtom(selectItemAtom);

  const modalHandler = () => {
    setModalOpen(true);
  };
  const specialSrc = 'https://i.ibb.co/dgfdZVr/Pngtree-3d-pinpoint-location-marker-icon-15108674.png'
  const markerImageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
  const imageSize = { width: 36, height: 37 };
  const spriteSize = { width: 36, height: 691 };

  useEffect(() => {
    if (!map) return;
    if (keyword == null) {
      setMessage(true);
      return;
    }
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      keyword,
      (data, status, _pagination) => {
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
            bounds.extend(new kakao.maps.LatLng(parseFloat(data[i].y), parseFloat(data[i].x)));
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
        radius: 500,
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

    return (
      <MapMarker
        position={position}
        image={{
          src: markerImageSrc,
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
        {(keyword || places.length === 0 ||places.length !==0) && (
          <MapMarker 
            position={defaultCenter}
            image={{
              src: specialSrc,
              size: { width: 64, height: 69 }, // Adjust the size as needed
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
        {!keyword && <MapException />}
        {keyword && flag && <SearchException />}
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
  );
}

export default KakaoKeywordMap;