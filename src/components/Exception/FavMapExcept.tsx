import React from "react";
import styled from "styled-components";
import map from "../../assets/map.png";
function FavMapExcept() {
  return (
    <FavMapEceptWrap>
      <Image src={map} alt="지도" />
      <Message>아직 장소가 선택되지 않았어요</Message>
      <MessageSub>옆에 즐겨찾기에서 장소를 선택할 수 잇어요</MessageSub>
      <MessageTitle>장소를 선택해 보세요!</MessageTitle>
    </FavMapEceptWrap>
  );
}

export default FavMapExcept;

const FavMapEceptWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Image = styled.img`
  width: 100px; /* Adjust the size as needed */
  height: auto;
  margin-bottom: 30px;
`;

const Message = styled.div`
  font-size: 17px;
  color: #737373;
  margin-bottom: 0.5rem;
  font-weight: 800;
`;
const MessageSub = styled.div`
  font-size: 13px;
  color: #939393;
  margin-bottom: 2rem;
`;

const MessageTitle = styled.div`
  font-size: 25px;
  font-weight: 800;
  color: #333;
`;
