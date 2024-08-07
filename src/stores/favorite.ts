import { atom } from "jotai";
//즐겨찾기에서 선택한 위도, 경도
export const latitudeAtom = atom<number | null>(null);
export const longitudeAtom = atom<number | null>(null);
