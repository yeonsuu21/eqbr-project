import { atom } from "jotai";
//키워드 검색 시 버튼 활성화
export const searchActBtnAtom = atom<boolean>(false);

export const favPlaceAtom = atom<string>('')