import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from '../../assets/logo.png';
import toss from '../../assets/toss.png';

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
        <LogoImg src={toss} alt='logo'/>
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
  height: 4.5rem;
  display: flex;
  background-color: #0064FF;
  border-bottom-left-radius: 36px;
  border-bottom-right-radius: 36px;
`;

export const Logo = styled.div`
  width: 3.5rem;
  height: 3.5rem;
 margin-left: 2rem;
 margin-top: 0.5rem;
`;

export const LogoImg = styled.img`
 width: 3.5rem;
 height: 3.5rem;
`;

export const TabStr = styled.div`
  display: flex;
  align-items: center;
 margin-left: 5rem;

  .map{
    color: #EEEEEE;
    font-size: 23px;
    font-weight: 600;
    margin-right: 5rem;
    cursor: pointer;
    font-family: pretendard;
  }
  .map:active{
    color: red;
  }
  .fav{
    color: #EEEEEE;
    font-size: 23px;
    font-weight: 600;
    cursor: pointer;
  }
`;

export default TabBar;