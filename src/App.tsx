import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FavPage from 'pages/FavPage';
import MapPage from 'pages/MapPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>                                             
          <Route path='/' element={<MapPage />} />
          <Route path='/fav' element={<FavPage />} />              
        </Routes>
    </BrowserRouter>
  );
}

export default App;
