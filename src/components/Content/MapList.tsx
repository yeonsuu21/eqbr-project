import { Place } from "components/Map/MapTest";
import { useAtom } from "jotai";
import { none } from "ol/centerconstraint";
import React from "react";
import { selectAdrAtom, selectPhoneAtom, selectSubAdrAtom } from "stores/map";

interface PlacesListProps {
  places: Place[];
  map: any;
  markers: any[];
  setSelectedPlace: (place: Place) => void;
  setFavPlace: (address: string) => void;
  modalHandler: () => void;
}

const PlacesList: React.FC<PlacesListProps> = ({
  places,
  map,
  markers,
  setSelectedPlace,
  setFavPlace,
  modalHandler,
}) => {
  const [selectAdr, setSelectAdr] = useAtom(selectAdrAtom);
  const [selectPhone, setSelectPhone] = useAtom(selectPhoneAtom);
  const [selectSubAdr, setSelectSubAdr] = useAtom(selectSubAdrAtom);
  return (
    <ul id="placesList">
      {places.map((item, i) => (
        <div
          key={i}
          className="item"
          onClick={() => {
            map.panTo(
              new kakao.maps.LatLng(
                markers[i].position.lat,
                markers[i].position.lng
              )
            );
            setSelectedPlace(item);
            setFavPlace(item.address_name);
          }}
        >
          <span className={`markerbg marker_${i + 1}`}></span>
          <div className="info">
            <h2>{item.place_name}</h2>
            {item.road_address_name ? (
              <>
                <span>{item.road_address_name}</span>
                <span className="jibun gray">{item.address_name}</span>
              </>
            ) : (
              <span>{item.address_name}</span>
            )}
            <div>
              <span className="tel">
                {item.phone ? item.phone : "번호 없음"}
              </span>
              <div style={{ marginLeft: "39%" }}>
                <a
                  href={`https://map.kakao.com/?sName=서울 강남구 봉은사로 411&eName=${encodeURIComponent(
                    item.place_name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "10px",
                    padding: "0.4rem",
                    borderRadius: "10px",
                    backgroundColor: "#EFEFEF",
                    color: "#5A5A5A",
                  }}
                >
                  길찾기
                </a>
                <button
                  style={{
                    border: "none",
                    padding: "0.4rem",
                    borderRadius: "10px",
                    fontSize: "10px",
                    margin: "0 1rem",
                    color: "#5A5A5A",
                    cursor: "pointer",
                  }}
                  onClick={modalHandler}
                >
                  즐겨찾기
                </button>
                <a
                  style={{
                    fontSize: "10px",
                    padding: "0.4rem",
                    borderRadius: "10px",
                    backgroundColor: "#EFEFEF",
                    color: "#5A5A5A",
                  }}
                  href={`https://place.map.kakao.com/${encodeURIComponent(
                    item.id
                  )}`}
                >
                  상세보기
                </a>
              </div>
            </div>
          </div>
          <div
            className="button"
            style={{ display: "flex", justifyContent: "space-between" }}
          ></div>
        </div>
      ))}
    </ul>
  );
};

export default PlacesList;
