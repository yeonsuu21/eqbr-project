import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.png";
type Tab = "MAP" | "FAV";

function TabBar() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<Tab>();
  const location = useLocation().pathname;

  const navigateToTab = (tab: Tab): void => {
    setSelectedTab(tab);
    if (tab === "MAP") {
      navigate("/");
    } else if (tab === "FAV") {
      navigate("/fav");
    }
  };

  useEffect(() => {
    if (location === "/") {
      setSelectedTab("MAP");
    } else if (location === "/fav") {
      setSelectedTab("FAV");
    }
  }, [location, setSelectedTab]);

  return (
    <TabBarWapper>
      <Logo>
        <LogoImg src={logo} alt="logo" onClick={() => navigateToTab("MAP")} />
      </Logo>
      <TabStr>
        <div
          className={selectedTab === "MAP" ? "map-act" : "map"}
          onClick={() => navigateToTab("MAP")}
        >
          지도
        </div>
        <div
          className={selectedTab === "FAV" ? "fav-act" : "fav"}
          onClick={() => navigateToTab("FAV")}
        >
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
    font-family: pretendard;
  }
`;

export default TabBar;
