import { atom } from "jotai";
//키워드 검색
export const searchBtnAtom = atom<boolean>(false);
export const searchStrAtom = atom<string>('');

//카테고리
export const categoryStrAtom = atom<string>('');