import React from "react";
import styled from "styled-components";
import fav from "../../assets/fav.png";
import { useNavigate } from "react-router-dom";
function FavListExcept() {
  const navigate = useNavigate();
  const navigateClick = () => {
    navigate("/");
  };
  return (
    <ExceptionWrapper>
      <Image src={fav} alt="마커" />
      <Message>아직 즐겨찾기가 존재하지 않아요</Message>
      <MessageSub>홈 - 키워드 검색 - 즐겨찾기 등록</MessageSub>
      <MessageTitle>즐겨찾기를 추가해 보세요!</MessageTitle>
      <ExceptBtn onClick={navigateClick}>추가하러 가기</ExceptBtn>
    </ExceptionWrapper>
  );
}

export default FavListExcept;
const ExceptionWrapper = styled.div`
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
  margin-bottom: 0.3rem;
  font-weight: 800;
`;
const MessageSub = styled.div`
  font-size: 13px;
  color: #939393;
  margin-bottom: 1rem;
`;
const MessageTitle = styled.div`
  font-size: 25px;
  font-weight: 800;
  color: #333;
  margin-bottom: 3.5rem;
`;
const ExceptBtn = styled.button`
  border: none;
  font-family: pretandard;
  padding: 0.7rem 5rem;
  border-radius: 20px;
  font-weight: 700;
  color: #505050;
  cursor: pointer;
`;
