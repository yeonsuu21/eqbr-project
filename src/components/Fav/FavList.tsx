import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FavContent from "./FavContent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FavListExcept from "components/Exception/FavListExcept";

function FavList() {
  const [parsedItem, setParsedItem] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const item = localStorage.getItem("select");
    if (item) {
      try {
        const parsed = JSON.parse(item);
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
    setVisibleCount((prevCount) => Math.min(prevCount + 5, parsedItem.length)); 
  };

  const moveFavContent = (fromIndex: number, toIndex: number) => {
    const updatedItems = [...parsedItem];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setParsedItem(updatedItems);
    localStorage.setItem("select", JSON.stringify(updatedItems));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <FavListWrapper>
          {parsedItem.length === 0 ? (
            <EmptyMessage>
              <FavListExcept />
            </EmptyMessage>
          ) : (
            <>
              {parsedItem.slice(0, visibleCount).map((item, index) => (
                <FavContent
                  key={index}
                  item={item}
                  index={index}
                  moveFavContent={moveFavContent}
                />
              ))}
              {visibleCount < parsedItem.length && (
                <ShowMoreButton onClick={handleShowMore}>더보기</ShowMoreButton>
              )}
            </>
          )}
        </FavListWrapper>
      </div>
    </DndProvider>
  );
}

export const FavListWrapper = styled.div`
  width: 35rem;
  height: 35rem;
  border: 1px solid #efefef;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-top: 3rem;
  border-radius: 40px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ShowMoreButton = styled.button`
  width: 70%;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-weight: 700;
  border-radius: 0 0 30px 30px;
  margin-bottom: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`;

export const EmptyMessage = styled.div`
  font-size: 1.5rem;
  color: #333;
`;

export default FavList;
