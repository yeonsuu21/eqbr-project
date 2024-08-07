import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { useAtom } from "jotai";
import { selectTabAtom } from "stores/map";

function TabBar() {
  const navigate = useNavigate();
  const [flag, setFlag] = useAtom(selectTabAtom);

  const routeFav = () => {
    setFlag(true);
    navigate("/fav");
  };

  const routeMain = () => {
    setFlag(true);
    navigate("/");
  };

  return (
    <TabBarWapper>
      <Logo>
        <LogoImg src={logo} alt="logo" />
      </Logo>
      <TabStr>
        {flag ? (
          <div className="map-act" onClick={routeMain}>
            지도
          </div>
        ) : (
          <div className="map" onClick={routeMain}>
            지도
          </div>
        )}
        {flag ? (
          <div className="fav-act" onClick={routeFav}>
            즐겨찾기
          </div>
        ) : (
          <div className="fav" onClick={routeFav}>
            즐겨찾기
          </div>
        )}
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
`;

export const TabStr = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;

  .map {
    color: #eeeeee;
    font-size: 22px;
    font-weight: 600;
    margin-right: 5rem;
    cursor: pointer;
    font-family: pretendard;
  }
  .map-act {
    color: #eeeeee;
    font-size: 22px;
    font-weight: 600;
    margin-right: 5rem;
    cursor: pointer;
    font-family: pretendard;
  }
  .fav {
    color: #eeeeee;
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
