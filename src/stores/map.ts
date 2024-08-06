import { atom } from "jotai";
//키워드 검색
export const searchBtnAtom = atom<boolean>(false); 
//키워드 검색 string
export const searchStrAtom = atom<string>('');

//카테고리
export const categoryStrAtom = atom<string>('');

export const categoryHistoryAtom = atom<string[]>([]);
//카테고리 + 키워드
export const searchAllAtom = atom<string>('');