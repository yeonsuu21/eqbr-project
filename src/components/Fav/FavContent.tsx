import React from 'react';
import styled from 'styled-components';
import { useSetAtom } from 'jotai';
import { latitudeAtom, longitudeAtom } from 'stores/map';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  FAV_CONTENT: 'favContent',
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

const FavContent: React.FC<FavContentProps> = ({ item, index, moveFavContent }) => {
  const setLatitude = useSetAtom(latitudeAtom);
  const setLongitude = useSetAtom(longitudeAtom);

  const handleItemClick = () => {
    if (item) {
      setLatitude(parseFloat(item.y));
      setLongitude(parseFloat(item.x));
    }
  };

  const deleteFav = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click event on the wrapper
    const existingItems = JSON.parse(localStorage.getItem('select') || '[]');
    const updatedItems = existingItems.filter((favItem: any) => favItem.id !== item.id);
    localStorage.setItem('select', JSON.stringify(updatedItems));
    alert('즐겨찾기에서 삭제되었습니다');
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
    <FavContentWrapper ref={ref} onClick={handleItemClick} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <FCTitle>{item.place_name}</FCTitle>
      <FCAdress>{item.road_address_name}</FCAdress>
      <FCSubAdress>{item.address_name}</FCSubAdress>
      <FCnumber>{item.phone}</FCnumber>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <a
          href={`https://map.kakao.com/?sName=서울 강남구 봉은사로 411&eName=${encodeURIComponent(item.place_name)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          길찾기
        </a>
        <button onClick={deleteFav}>즐겨찾기 삭제</button>
        <a href={`https://place.map.kakao.com/${encodeURIComponent(item.id)}`}>상세보기</a>
      </div>
    </FavContentWrapper>
  );
};

export const FavContentWrapper = styled.div`
  width: 90%;
  height: 7rem;
  border-radius: 30px;
  border: 1px solid black;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: white;
  cursor: move;
`;

export const FCTitle = styled.div`
  font-size: 20px;
`;

export const FCAdress = styled.div`
  font-size: 16px;
`;

export const FCSubAdress = styled.div`
  font-size: 16px;
`;

export const FCnumber = styled.div`
  font-size: 16px;
`;

export default FavContent;
