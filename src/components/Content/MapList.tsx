import { Place } from 'components/Map/MapTest';
import React from 'react';

interface PlacesListProps {
  places: Place[];
  map: any;
  markers: any[];
  setSelectedPlace: (place: Place) => void;
  setFavPlace: (address: string) => void;
  modalHandler: () => void;
}

const PlacesList: React.FC<PlacesListProps> = ({ places, map, markers, setSelectedPlace, setFavPlace, modalHandler }) => {
  return (
    <ul id="placesList">
      {places.map((item, i) => (
        <div
          key={i}
          className="item"
          onClick={() => {
            map.panTo(new kakao.maps.LatLng(markers[i].position.lat, markers[i].position.lng));
            setSelectedPlace(item);
            setFavPlace(item.address_name);
          }}
        >
          <span className={`markerbg marker_${i + 1}`}></span>
          <div className="info">
            <h5>{item.place_name}</h5>
            {item.road_address_name ? (
              <>
                <span>{item.road_address_name}</span>
                <span className="jibun gray">{item.address_name}</span>
              </>
            ) : (
              <span>{item.address_name}</span>
            )}
            <span className="tel">{item.phone ? item.phone : '번호 없음'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <a
              href={`https://map.kakao.com/?sName=서울 강남구 봉은사로 411&eName=${encodeURIComponent(item.place_name)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              길찾기
            </a>
            <button onClick={modalHandler}>즐겨찾기</button>
            <a href={`https://place.map.kakao.com/${encodeURIComponent(item.id)}`}>상세보기</a>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default PlacesList;