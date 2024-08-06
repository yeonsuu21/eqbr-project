import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FavContent from './FavContent';
import { useAtom } from 'jotai';
import { latitudeAtom, longitudeAtom } from 'stores/map';

function FavList() {
  const [parsedItem, setParsedItem] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(5); // Start by showing 5 items

  useEffect(() => {
    const item = localStorage.getItem("select");
    if (item) {
      try {
        const parsed = JSON.parse(item);
        console.log("Parsed item:", parsed);
        if (Array.isArray(parsed)) {
          setParsedItem(parsed);
        } else {
          console.error("Parsed item is not an array");
        }
      } catch (error) {
        console.error("Failed to parse", error);
      }
    }
  }, []);

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 5); // Show 5 more items when clicked
  };

  return (
    <div>
      <FavListWrapper>
        {parsedItem.length === 0 ? (
          <EmptyMessage>즐겨찾기를 추가해보세요!</EmptyMessage>
        ) : (
          <>
            {parsedItem.slice(0, visibleCount).map((item, index) => (
              <FavContent key={index} props={item} />
            ))}
            {parsedItem.length > 5 && visibleCount < parsedItem.length && (
              <ShowMoreButton onClick={handleShowMore}>더보기</ShowMoreButton>
            )}
          </>
        )}
      </FavListWrapper>
    </div>
  );
}

export const FavListWrapper = styled.div`
  width: 40rem;
  height: 40rem;
  border: 1px solid black;
  margin-left: 6rem;
  margin-top: 3rem;
  border-radius: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ShowMoreButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 0 0 30px 30px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const EmptyMessage = styled.div`
  font-size: 1.5rem;
  color: #333;
`;

export default FavList;