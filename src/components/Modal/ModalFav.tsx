import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { selectItemAtom } from "stores/map";
import { setmodalAtom } from "stores/modal";
import { favPlaceAtom } from "stores/search";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function ModalFav() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useAtom(setmodalAtom);
  const placeAddress = useAtomValue(favPlaceAtom);
  const selectItemArray = useAtomValue(selectItemAtom);

  const modalClose = () => {
    setModalOpen(false);
  };

  const actFav = () => {
    alert("즐겨찾기에 등록 되었습니다");
    setModalOpen(false);

    // 기존 데이터를 가져와서 새로운 데이터와 합치기
    const existingSelects = localStorage.getItem("select");
    let parsedExistingSelects = [];

    if (existingSelects) {
      try {
        parsedExistingSelects = JSON.parse(existingSelects);
        if (!Array.isArray(parsedExistingSelects)) {
          parsedExistingSelects = [];
        }
      } catch (e) {
        parsedExistingSelects = [];
      }
    }

    // selectItemArray를 배열로 감싸서 저장
    const validSelectItemArray = Array.isArray(selectItemArray)
      ? selectItemArray
      : [selectItemArray];
    const updatedSelects = [...validSelectItemArray, ...parsedExistingSelects];
    localStorage.setItem("select", JSON.stringify(updatedSelects));
    navigate("/fav");
  };

  return (
    <ModalFavWrapper>
      <FavTitle>즐겨찾기 등록</FavTitle>
      <FavSelectPlace defaultValue={placeAddress}></FavSelectPlace>
      <FavSelectMemo
        maxLength={19}
        placeholder="메모를 입력해 보세요!"
      ></FavSelectMemo>
      <BtnWrapper>
        <FavCancelBtn onClick={modalClose}>취소</FavCancelBtn>
        <FavActBtn onClick={actFav}>성공</FavActBtn>
      </BtnWrapper>
    </ModalFavWrapper>
  );
}
export const ModalFavWrapper = styled.div`
  width: 95%;
  height: 90%;
  margin: 0.5rem;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

export const FavTitle = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: #737373;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export const FavSelectPlace = styled.input`
  width: 63%;
  height: 2.5rem;
  border-radius: 20px;
  background-color: #d9d9d9;
  border: none;
  margin-bottom: 1.4rem;
  font-size: 15px;
  padding-left: 1rem;
  font-weight: 500;
`;

export const FavSelectMemo = styled.input`
  width: 63%;
  height: 2.5rem;
  border-radius: 20px;
  background-color: #d9d9d9;
  border: none;
  font-size: 15px;
  padding-left: 1rem;
`;

export const BtnWrapper = styled.div`
  display: flex;
  margin-top: 2.6rem;
  width: 13rem;
  height: 2.3rem;
  justify-content: space-between;
`;

export const FavCancelBtn = styled.button`
  width: 5rem;
  height: 2.3rem;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #737373;
    color: white;
  }
`;

export const FavActBtn = styled.button`
  width: 5rem;
  height: 2.3rem;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #0064ff;
    color: white;
  }
`;
export default ModalFav;
