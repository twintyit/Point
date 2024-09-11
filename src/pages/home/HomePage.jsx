import React, { useState, useEffect } from 'react';
import Carousel from '../../components/carousel/Carousel';
import ProductList from '../../components/ProductList';
import './HomePage.css';

const HomePage = () => {
    return (
            <div className=''>
                <Carousel />
                <div className='p-3'>
                    <h5>All Products</h5>
                    <ProductList />
                </div>
            </div>
    );
};

export default HomePage;