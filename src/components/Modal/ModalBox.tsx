import React from "react";
import Modal from "react-modal";
import { setmodalAtom } from "stores/modal";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { selectIdAtom, selectItemAtom } from "stores/map";
import { favPlaceAtom } from "stores/search";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { favListArrayAtom } from "stores/favorite";
Modal.setAppElement("#root");

function ModalBox() {
  const [modalOpen, setModalOpen] = useAtom(setmodalAtom);
  const navigate = useNavigate();
  const placeAddress = useAtomValue(favPlaceAtom);
  const selectItem = useAtomValue(selectItemAtom);
  const [favList, setFavList] = useAtom(favListArrayAtom);
  const selectedId = useAtomValue(selectIdAtom);
  const modalClose = () => {
    setModalOpen(false);
  };
  const actFav = () => {
    //ID 중복 확인
    const isDuplicate = favList.some((item) => item.id === selectedId);
    if (isDuplicate) {
      alert("이미 등록된 장소입니다");
      setModalOpen(false);
      return;
    }
    console.log(selectedId);
    alert("즐겨찾기에 등록 되었습니다");
    setModalOpen(false);

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

    const updatedSelects = [selectItem, ...parsedExistingSelects];
    setFavList(updatedSelects);
    localStorage.setItem("select", JSON.stringify(updatedSelects));
    navigate("/fav");
  };
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      ariaHideApp={false}
      style={customModalStyles}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick={true}
    >
      <ModalFavWrapper>
        <FavTitle>즐겨찾기 등록</FavTitle>
        <FavSelectPlace defaultValue={placeAddress}></FavSelectPlace>
        <FavSelectMemo
          maxLength={20}
          placeholder="메모를 입력해 보세요!"
        ></FavSelectMemo>
        <BtnWrapper>
          <FavCancelBtn onClick={modalClose}>취소</FavCancelBtn>
          <FavActBtn onClick={actFav}>성공</FavActBtn>
        </BtnWrapper>
      </ModalFavWrapper>
    </Modal>
  );
}

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "1000",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "540px",
    height: "350px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};
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
  margin-top: 1.7rem;
  font-size: 28px;
  font-weight: 700;
  color: black;
  margin-bottom: 3rem;
`;

export const FavSelectPlace = styled.input`
  width: 63%;
  height: 2.5rem;
  border-radius: 20px;
  background-color: #d9d9d9;
  border: none;
  margin-bottom: 1.4rem;
  font-size: 16px;
  padding-left: 1rem;
  font-weight: 600;
  color: #505050;
`;

export const FavSelectMemo = styled.input`
  width: 63%;
  height: 2.5rem;
  border-radius: 20px;
  background-color: #d9d9d9;
  border: none;
  font-size: 16px;
  padding-left: 1rem;
  font-weight: 600;
  color: #505050;
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
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  &:hover {
    font-weight: 700;
    background-color: #979797;
    color: white;
  }
`;

export const FavActBtn = styled.button`
  width: 5rem;
  height: 2.3rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  &:hover {
    font-weight: 700;
    background-color: #253bff;
    color: white;
  }
`;
export default ModalBox;
