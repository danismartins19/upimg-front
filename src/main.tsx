import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { View } from './pages/View';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/view/:id' element={<View/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode> 
)
