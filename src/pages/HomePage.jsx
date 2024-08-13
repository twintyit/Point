import React, { useState, useEffect } from 'react';
import Slidebar from '../components/Sidebar'
import Carousel from '../components/Carousel';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="main-container">
            <div className="category-menu">
                <Slidebar />
            </div>
            <div className="content">
                <Carousel />
            </div>
        </div>
    );
};

export default HomePage;