import { Place } from "components/Map/MapTest";
import { atom } from "jotai";
//키워드 검색
export const searchBtnAtom = atom<boolean>(false);
//키워드 검색 string
export const searchStrAtom = atom<string>("");

//카테고리
export const categoryStrAtom = atom<string>("");

export const categoryHistoryAtom = atom<string[]>([]);
//카테고리 + 키워드
export const searchAllAtom = atom<string>("");

export const selectIdAtom = atom<string>("");
//선택한 정보 전체
export const selectItemAtom = atom<Place | null>(null);

//유저가 선택한 pick의 정보
export const selectAdrAtom = atom<string>("");
export const selectPhoneAtom = atom<string>("");
export const selectSubAdrAtom = atom<string>("");

export const selectTabAtom = atom<boolean>(false);
