import React from 'react';
import styled from 'styled-components';
import { useSetAtom } from 'jotai';
import { latitudeAtom, longitudeAtom } from 'stores/map';

interface FavContentProps {
  props: {
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
  } | null;
}

const FavContent: React.FC<FavContentProps> = ({ props }) => {
  const setLatitude = useSetAtom(latitudeAtom);
  const setLongitude = useSetAtom(longitudeAtom);

  const handleItemClick = () => {
    if (props) {
      setLatitude(parseFloat(props.y));
      setLongitude(parseFloat(props.x));
    }
  };

  const deleteFav = () => {
    if (props) {
      const existingItems = JSON.parse(localStorage.getItem('select') || '[]');
      const updatedItems = existingItems.filter((item: any) => item.id !== props.id);
      localStorage.setItem('select', JSON.stringify(updatedItems));
      alert('즐겨찾기에서 삭제되었습니다');
      window.location.reload();
    }
  };

  if (!props) {
    return <div></div>;
  }

  return (
    <FavContentWrapper onClick={handleItemClick}>
      <FCTitle>{props.place_name}</FCTitle>
      <FCAdress>{props.road_address_name}</FCAdress>
      <FCSubAdress>{props.address_name}</FCSubAdress>
      <FCnumber>{props.phone}</FCnumber>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <a
          href={`https://map.kakao.com/?sName=서울 강남구 봉은사로 411&eName=${encodeURIComponent(props.place_name)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          길찾기
        </a>
        <button onClick={deleteFav}>즐겨찾기 삭제</button>
        <a href={`https://place.map.kakao.com/${encodeURIComponent(props.id)}`}>상세보기</a>
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