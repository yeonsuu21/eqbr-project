import React from "react";
import styled, { css } from "styled-components";
import { useSetAtom } from "jotai";
import {
  latitudeAtom,
  longitudeAtom,
  selectAdressAtom,
  selectContentAtom,
  selectFavPhoneAtom,
  selectFavSubAdrAtom,
} from "stores/favorite";
import { useDrag, useDrop } from "react-dnd";
import xIng from "../../assets/x.png";
const ItemTypes = {
  FAV_CONTENT: "favContent",
};

interface FavContentProps {
  item: {
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
  };
  index: number;
  moveFavContent: (dragIndex: number, hoverIndex: number) => void;

}

const FavContent: React.FC<FavContentProps> = ({
  item,
  index,
  moveFavContent,
}) => {
  const setLatitude = useSetAtom(latitudeAtom);
  const setLongitude = useSetAtom(longitudeAtom);
  const selectContent = useSetAtom(selectContentAtom);
  const selectAdress = useSetAtom(selectAdressAtom);
  const selectSubAdr = useSetAtom(selectFavSubAdrAtom);
  const selectPhone = useSetAtom(selectFavPhoneAtom);
  
  const handleItemClick = () => {
    setLatitude(parseFloat(item.y));
    setLongitude(parseFloat(item.x));
    selectContent(item.place_name);
    selectAdress(item.address_name);
    selectSubAdr(item.road_address_name);
    selectPhone(item.phone);
  };

  const deleteFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    const existingItems = JSON.parse(localStorage.getItem("select") || "[]");
    const updatedItems = existingItems.filter(
      (favItem: any) => favItem.id !== item.id
    );
    localStorage.setItem("select", JSON.stringify(updatedItems));
    alert("즐겨찾기에서 삭제되었습니다");
    window.location.reload();
  };

  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.FAV_CONTENT,
    hover(draggedItem: { index: number }) {
      if (draggedItem.index !== index) {
        moveFavContent(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FAV_CONTENT,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <FavContentWrapper
      ref={ref}
      onClick={handleItemClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Arrange>{index + 1}</Arrange>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FCTitle>{item.place_name}</FCTitle>
          <FCTImage onClick={deleteFav}>
            <img src={xIng} style={{ width: "1.3rem" }} alt="delete icon"/>
          </FCTImage>
        </div>
        <FCAdress>{item.road_address_name}</FCAdress>
        <FCSubAdress>(지번) {item.address_name}</FCSubAdress>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FCnumber>{item.phone ? item.phone : "번호 없음"}</FCnumber>
          <div>
            <a
              style={{
                fontSize: "11px",
                padding: "0.5rem 0.8rem",
                borderRadius: "10px",
                fontWeight: "600",
                backgroundColor: "#EFEFEF",
                color: "#5A5A5A",
                textDecorationLine: "none",
              }}
              href={`https://map.kakao.com/?sName=서울 강남구 봉은사로 411&eName=${encodeURIComponent(
                item.place_name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              길찾기
            </a>
            <a
              href={`https://place.map.kakao.com/${encodeURIComponent(
                item.id
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "11px",
                padding: "0.5rem 0.8rem",
                borderRadius: "10px",
                fontWeight: "600",
                backgroundColor: "#EFEFEF",
                color: "#5A5A5A",
                marginLeft: "1rem",
                textDecorationLine: "none",
              }}
            >
              상세보기
            </a>
          </div>
        </div>
      </div>
    </FavContentWrapper>
  );
};

export const FavContentWrapper = styled.div`
  width: 83%;
  height: 7rem;
  border-radius: 30px;
  border: 1px solid #efefef;
  padding: 1rem 1.8rem;
  margin-bottom: 0.5rem;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  display: flex;
`;

export const FCTImage = styled.div`
  cursor: pointer;
`;

export const Arrange = styled.div`
  font-size: 30px;
  font-weight: 800;
  margin-right: 2rem;
  color: #979797;
`;

export const FCTitle = styled.div`
  font-size: 20px;
  font-family: pretandard;
  font-weight: 800;
  margin-bottom: 0.3rem;
`;

export const FCAdress = styled.div`
  font-size: 15px;
  font-family: pretandard;
  font-weight: 700;
  color: #505050;
  margin-bottom: 0.16rem;
`;

export const FCSubAdress = styled.div`
  font-size: 13px;
  font-family: pretandard;
  font-weight: 700;
  color: #737373;
  margin-bottom: 1rem;
`;

export const FCnumber = styled.div`
  font-size: 17px;
  font-family: pretandard;
  font-weight: 700;
  color: #0064ff;
`;

export default FavContent;