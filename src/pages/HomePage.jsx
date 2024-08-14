import React, { useState, useEffect } from 'react';
import Slidebar from '../components/Sidebar'
import Carousel from '../components/Carousel';
import ProductList from '../components/ProductList';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className=" content row ">
            <div className="category-menu col-md-3">
                <Slidebar />
            </div>
            <div className="content col-md-9" >
                <Carousel />
                <div className='p-3'>
                    <h5>All Products</h5>
                    <ProductList />
                </div>
            </div>
        </div>
    );
};

export default HomePage;