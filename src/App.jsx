import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navigation/navbar/Navbar';
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProductDetail from './pages/productDetail/ProductDetail';
import CategoryPage from './pages/CategoryPage'
import FoundItemsPage from './pages/FoundItemsPage';

import './App.css';

function App() {
  
  return (
    <BrowserRouter>
      <Navbar  />
      <div className="main mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/search/:text" element={<FoundItemsPage />} />
        </Routes>
      </div>

     
    </BrowserRouter>
  );
}

export default App;
