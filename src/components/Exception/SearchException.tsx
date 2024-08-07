import React from "react";
import styled from "styled-components";
import warn from "../../assets/warn.png";
function SearchException() {
  return (
    <ExceptionWrapper>
      <Image src={warn} alt="마커" />
      <Message>검색 결과가 존재하지 않아요</Message>
      <MessageTitle>다른 키워드로 검색해 보세요!</MessageTitle>
    </ExceptionWrapper>
  );
}
const ExceptionWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Image = styled.img`
  width: 100px; /* Adjust the size as needed */
  height: auto;
  margin-bottom: 20px;
`;

const Message = styled.div`
  font-size: 16px;
  color: #939393;
  margin-bottom: 1.5rem;
  font-weight: 800;
`;
const MessageTitle = styled.div`
  font-size: 25px;
  font-weight: 800;
  color: #333;
`;
export default SearchException;
