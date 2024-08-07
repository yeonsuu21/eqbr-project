import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { useAtom } from "jotai";
import { selectTabAtom } from "stores/map";

function TabBar() {
  const navigate = useNavigate();
  const [flag, setFlag] = useAtom(selectTabAtom);
//flag가 flase면 지도 선택된것
  const routeFav = () => {
    setFlag(true);
    navigate("/fav");
  };

  const routeMain = () => {
    setFlag(false);
    navigate("/");
  };

  return (
    <TabBarWapper>
      <Logo>
        <LogoImg src={logo} alt="logo" onClick={() => { navigate('/') }} />
      </Logo>
      <TabStr>
        <div className={!flag ? "map-act" : "map"} onClick={routeMain}>
          지도
        </div>
        <div className={flag ? "fav-act" : "fav"} onClick={routeFav}>
          즐겨찾기
        </div>
      </TabStr>
    </TabBarWapper>
  );
}

export const TabBarWapper = styled.div`
  height: 3.8rem;
  display: flex;
  background-color: #253bff;
  border-bottom-left-radius: 36px;
  border-bottom-right-radius: 36px;
`;

export const Logo = styled.div`
  width: 10rem;
  height: 4rem;
  margin-left: 2rem;
  margin-top: 0.1rem;
`;

export const LogoImg = styled.img`
  width: 9rem;
  height: 3.3rem;
  cursor: pointer;
`;

export const TabStr = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;

  .map {
    color: #979797;
    font-size: 22px;
    font-weight: 600;
    margin-right: 5rem;
    cursor: pointer;
    font-family: pretendard;
  }
  .map-act {
    color: white;
    font-size: 22px;
    font-weight: 600;
    margin-right: 5rem;
    cursor: pointer;
    font-family: pretendard;
  }
  .fav {
    color: #979797;
    font-size: 20.5px;
    font-weight: 600;
    cursor: pointer;
    font-family: pretendard;
  }
  .fav-act {
    color: #eeeeee;
    font-size: 20.5px;
    font-weight: 600;
    cursor: pointer;
    font-family: pretendard;
  }
`;

export default TabBar;
