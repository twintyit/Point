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
import AddProductPage from "./pages/admin/product/add-product-page/AddProductPage.jsx";
import CreateCategoryPage from "./pages/admin/category/create-category-page/CreateCategoryPage.jsx";
import AdminPanel from "./pages/admin/admin-panel/AdminPanel.jsx";
import CategoryManager from "./pages/admin/category/category-manager/CategoryManager.jsx";
import EditCategoryPage from "./pages/admin/category/edit-category-page/EditCategoryPage.jsx";
import CreateSubcategoryPage from "./pages/admin/subcategory/create-subcategory-page/CreateSubcategoryPage.jsx";
import EditSubcategoryPage from "./pages/admin/subcategory/edit-subcategory-page/EditSubcategoryPage.jsx";
import CreateBrandPage from "./pages/admin/brand/create-brand-page/CreateBrandPage.jsx";
import BrandManager from "./pages/admin/brand/brand-manager/BrandManager.jsx";
import EditBrandPage from "./pages/admin/brand/edit-brand-page/EditBrandPage.jsx";

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
                    <Route path="/admin/category" element={<CategoryManager />} />
                    <Route path="/admin/category/edit/:categoryId" element={<EditCategoryPage />} />
                    <Route path="/admin/create-category" element={<CreateCategoryPage />} />
                    <Route path="/admin/create-subcategory" element={<CreateSubcategoryPage />} />
                    <Route path="/admin/edit-subcategory/:id" element={<EditSubcategoryPage />} />

                    <Route path="/admin/brand" element={<BrandManager />} />
                    <Route path="/admin/brand/create" element={<CreateBrandPage />} />
                    <Route path="/admin/brand/edit/:id" element={<EditBrandPage />} />


                    {/*<Route path="/admin/product" element={<AdminPanel />} />*/}
                    {/*<Route path="/admin/create-product" element={<AddProductPage />} />*/}


                </Routes>
              </Layout>
            </ModalProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
