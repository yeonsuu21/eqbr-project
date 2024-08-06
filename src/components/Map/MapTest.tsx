import React, { useState, useEffect } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import './Map.css';
import SideBar from 'components/SideBar/SideBar';
import { categoryStrAtom, searchAllAtom, searchStrAtom, selectIdAtom, selectItemAtom } from 'stores/map';
import { useAtom, useAtomValue } from 'jotai';
import { Link } from 'react-router-dom';
import { setmodalAtom } from 'stores/modal';
import ModalBox from 'components/Modal/ModalBox';
import { favPlaceAtom } from 'stores/search';
import MapException from 'components/Exception/MapException';
import SearchException from 'components/Exception/SearchException';
import PlacesList from 'components/Content/MapList';
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
function KakaoKeywordMap() {
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [message, setMessage] = useState(false);
  const [modalOpen, setModalOpen] = useAtom(setmodalAtom);
  const [favPlace, setFavPlace] = useAtom(favPlaceAtom);
  //검색결과
  const [flag, setFlag] = useState(false);
  //검색 or 키워드 나중에 된 것 적용
  const keyword = useAtomValue(searchAllAtom)
  const [selectedPlace, setSelectedPlace] = useAtom(selectItemAtom);

 const modalHandler =()=>{
    setModalOpen(true)
 }
  const markerImageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
  const imageSize = { width: 36, height: 37 };
  const spriteSize = { width: 36, height: 691 };
  console.log(message)
  useEffect(() => {
    if (!map) return;
    if (keyword==null) {
        setMessage(true);
        return;
    }
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword,(data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);
        console.log(data)
        /* 이하는 function displayPlaces(places) 함수와 비슷한 내용 */
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

    
        map.setBounds(bounds);
      }else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setFlag(true)
        return;
 
    } else if (status === kakao.maps.services.Status.ERROR) {
 
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
 
    }
    },{
        //검색 범위 예외처리
        radius: 500,
        location: new kakao.maps.LatLng(37.50693697914934, 127.05577247718644)
    });
    setFlag(false)
  }, [map, keyword , message]);

  const EventMarkerContainer = ({ position, content, i }: any) => {
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
        {isVisible && <div style={{ color: '#000' }}>{content}</div>}
      </MapMarker>
    );
  };

  return (
    <div className="map_wrap">
      {modalOpen ? <ModalBox/> : ''}
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.50693697914934,
          lng: 127.05577247718644,
        }}
        style={{
          width: '100%',
          height: '100vh',
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker, i) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${marker.position.lat}-${marker.position.lng}`}
            position={marker.position}
            content={marker.content}
            i={i}
          />
        ))}
      </Map>
      <div id="menu_wrap" className="bg_white">
      <SideBar/>
        {/* 사이드바 */}
        <hr />
        {!keyword && <MapException/>}
        {keyword && flag && <SearchException/>}
        {keyword && !flag &&
         <PlacesList
         places={places}
         map={map}
         markers={markers}
         setSelectedPlace={setSelectedPlace}
         setFavPlace={setFavPlace}
         modalHandler={modalHandler}
       />}
       
        <div id="pagination"></div>
      </div>
    </div>
  );
}

export default KakaoKeywordMap;
