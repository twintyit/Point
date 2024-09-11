import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProductDetail from './pages/productDetail/ProductDetail';
import CategoryPage from './pages/CategoryPage'
import FoundItemsPage from './pages/FoundItemsPage';
import Cabinet from './pages/auth/cabinet/Cabinet';
import Layout from './Layout';
import UserOrders from './pages/auth/userorders/UserOrders';
import UserAccount from './pages/auth/useraccount/UserAccount';
import { ModalProvider } from './components/modal/ModalContext';

import './App.css';

function App() {
  
  return (
    <ModalProvider>
      <BrowserRouter>
        <Layout>    
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/search/:text" element={<FoundItemsPage />} />
            <Route path="/cabinet" element={<Cabinet />} />
            <Route path="/cabinet/orders" element={<UserOrders />} />
            <Route path="/cabinet/account" element={<UserAccount />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
