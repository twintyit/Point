import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/login-page/LoginPage';
import SignupPage from './pages/auth/signup-page/SignupPage.jsx';
import ProductDetail from './pages/product-detail/ProductDetail';
import CategoryPage from './pages/category-page/CategoryPage.jsx'
import FoundItemsPage from './pages/search-page/FoundItemsPage.jsx';
import Cabinet from './pages/auth/cabinet/Cabinet';
import Layout from './Layout';
import UserOrders from './pages/auth/user-orders/UserOrders';
import UserAccount from './pages/auth/user-account/UserAccount';
import { ModalProvider } from './contexts/ModalContext';
import { CartProvider } from './contexts/CartContext';
import CheckoutPage from './pages/checkout/CheckoutPage';
import { AuthProvider } from './contexts/AuthContext';

import './App.css';
import AddProductPage from "./pages/admin/add-product-page/AddProductPage.jsx";
import AddCategoryPage from "./pages/admin/add-category-page/AddCategoryPage.jsx";
import DeleteProductPage from "./pages/admin/delete-product-page/DeleteProductPage.jsx";
import AdminPanel from "./pages/admin/admin-panel/AdminPanel.jsx";

function App() {
  
  return (
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ModalProvider>
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
                    <Route path="/checkout" element={<CheckoutPage />} />

                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/admin/add-product" element={<AddProductPage />} />
                    <Route path="/admin/add-category" element={<AddCategoryPage />} />
                    <Route path="/admin/delete-product" element={<DeleteProductPage />} />
                </Routes>
              </Layout>
            </ModalProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
