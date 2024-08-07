import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { selectIdAtom, selectItemAtom } from 'stores/map';
import { setmodalAtom } from 'stores/modal';
import { favPlaceAtom } from 'stores/search';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { favListArrayAtom } from 'stores/favorite';

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
    font-size: 28px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 3rem;
`;

export const FavSelectPlace = styled.input`
    width: 63%;
    height: 2.5rem;
    border-radius: 20px;
    background-color: #D9D9D9;
    border: none;
    margin-bottom: 1.4rem;
    font-size: 16px;
    padding-left: 1rem;
`;

export const FavSelectMemo = styled.input`
    width: 63%;
    height: 2.5rem;
    border-radius: 20px;
    background-color: #D9D9D9;
    border: none;
    font-size: 16px;
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
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    &:hover{
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
    &:hover{
      font-weight: 700;
      background-color: #253bff;
      color: white;
    }
`;

function ModalFav() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useAtom(setmodalAtom);
    const placeAddress = useAtomValue(favPlaceAtom);
    const selectItem = useAtomValue(selectItemAtom);
    const [favList, setFavList] = useAtom(favListArrayAtom);
    const selectedId = useAtomValue(selectIdAtom);

    const modalClose = () => {
        setModalOpen(false);
    };

    const actFav = () => {
        // Check for duplicate ID
        const isDuplicate = favList.some(item => item.id === selectedId);
        if (isDuplicate) {
            alert('이미 등록된 장소입니다');
            return;
        }
console.log(selectedId)
        alert('즐겨찾기에 등록 되었습니다');
        setModalOpen(false);

        // Get existing data and combine with the new data
        const existingSelects = localStorage.getItem('select');
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
        setFavList(updatedSelects); // Update the atom state
        localStorage.setItem('select', JSON.stringify(updatedSelects));
        navigate('/fav');
    };

    return (
        <ModalFavWrapper>
            <FavTitle>
                즐겨찾기 등록
            </FavTitle>
            <FavSelectPlace defaultValue={placeAddress}>
            </FavSelectPlace>
            <FavSelectMemo placeholder='메모를 입력해 보세요!'>
            </FavSelectMemo>
            <BtnWrapper>
                <FavCancelBtn onClick={modalClose}>취소</FavCancelBtn>
                <FavActBtn onClick={actFav}>성공</FavActBtn>
            </BtnWrapper>
        </ModalFavWrapper>
    );
}

export default ModalFav;