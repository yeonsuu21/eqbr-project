import React, { useEffect, useState } from "react";

interface MapDisplayProps {
  searchPlace: string;
  setPlaces: React.Dispatch<React.SetStateAction<any[]>>;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ searchPlace, setPlaces }) => {
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const { kakao }: any = window;
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers: any[] = [];
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();

    if (searchPlace === "") {
      setNoResults(false);
      const defaultLatLng = new kakao.maps.LatLng(
        37.50693697914934,
        127.05577247718644
      );
      let marker = new kakao.maps.Marker({
        map: map,
        position: defaultLatLng,
      });
      map.setCenter(defaultLatLng);

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">eqbr홀딩스</div>'
        );
        infowindow.open(map, marker);
      });
      //기본 지워놓음
      // setPlaces([{ place_name: 'Default Location', y: 37.50693697914934, x: 127.05577247718644 }]);
    } else {
      // Perform search
      ps.keywordSearch(searchPlace, placesSearchCB, {
        radius: 5000,
        location: new kakao.maps.LatLng(37.50693697914934, 127.05577247718644),
      });
    }

    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === kakao.maps.services.Status.OK) {
        if (data.length === 0) {
          setNoResults(true);
          setPlaces([]);
          map.setCenter(
            new kakao.maps.LatLng(37.50693697914934, 127.05577247718644)
          ); // Optional: Center the map to default location if no results
        } else {
          setNoResults(false);
          let bounds = new kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
          displayPagination(pagination);
          setPlaces(data);
        }
      } else {
        setNoResults(true);
        setPlaces([]);
      }
    }

    function displayPagination(pagination: any) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      if (paginationEl) {
        paginationEl.innerHTML = "";
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i.toString();

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl?.appendChild(fragment);
    }

    function displayMarker(place: any) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace, setPlaces]);

  return (
    <div>
      {noResults ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          지도가 로딩 되지 않습니다
        </div>
      ) : (
        <div id="myMap" style={{ width: "88rem", height: "65rem" }}></div>
      )}
    </div>
  );
};

export default MapDisplay;
