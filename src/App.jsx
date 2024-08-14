import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductList from './components/ProductList';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
