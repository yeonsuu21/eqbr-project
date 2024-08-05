import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from '../../assets/logo.png';

function TabBar() {
  const navigate = useNavigate();   
  
  const routeFav = () => {
    navigate('/fav');
  }

  const routeMain = () => {
    navigate('/');
  }

  return (
    <TabBarWapper>
      <Logo>
        <LogoImg src={logo} alt='logo'/>
      </Logo>
      <TabStr>
        <div className='map' onClick={routeMain}>
         지도
        </div>
        <div className='fav' onClick={routeFav}>
          즐겨찾기
        </div>
      </TabStr>
    </TabBarWapper>
  )
}

export const TabBarWapper = styled.div`
  border:1px solid black;
  height: 8rem;
  display: flex;
`;

export const Logo = styled.div`
  width: 14rem;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoImg = styled.img`
  width: 13rem;
  height: 6rem;
`;

export const TabStr = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;

  .map{
    font-size: 35px;
    font-weight: 600;
    margin-right: 5rem;
    cursor: pointer;
  }
  .map:active{
    color: red;
  }
  .fav{
    font-size: 35px;
    font-weight: 600;
    cursor: pointer;
  }
`;

export default TabBar;