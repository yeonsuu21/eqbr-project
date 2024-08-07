import { atom } from "jotai";
//즐겨찾기에서 선택한 위도, 경도
export const latitudeAtom = atom<number | null>(null);
export const longitudeAtom = atom<number | null>(null);

//즐겨찾기 배열 목록
interface FavItem {
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
  }
  
  export const favListArrayAtom = atom<FavItem[]>([]);