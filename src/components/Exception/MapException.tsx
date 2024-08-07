import React from "react";
import styled from "styled-components";
import marker from "../../assets/marker.png";

function MapException() {
  return (
    <ExceptionWrapper>
      <Image src={marker} alt="마커" />
      <Message>아직 검색이 존재하지 않아요</Message>
      <MessageTitle>이름이나 주소로 검색해 보세요!</MessageTitle>
    </ExceptionWrapper>
  );
}

export default MapException;

const ExceptionWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Image = styled.img`
  width: 170px;
  height: auto;
  margin-bottom: 2rem;
`;

const Message = styled.div`
  font-family: pretendard;
  font-weight: 600;
  font-size: 16px;
  color: #939393;
  margin-bottom: 0.4rem;
  font-weight: 800;
`;
const MessageTitle = styled.div`
  font-family: pretendard;
  font-size: 23px;
  font-weight: 800;
  color: #505050;
`;
