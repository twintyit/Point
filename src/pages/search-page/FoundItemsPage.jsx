import React, { useState, useEffect } from 'react';
import ProductList from '../../components/product-list/ProductList.jsx';
import { useParams } from 'react-router-dom';

const FoundItemsPage = () => {

    const { text } = useParams();

    return (
        <>
        <div>
                <h4 style={{fontWeight: 700}}>Результаты поиска <span style={{ color: 'blue' }}>"{text}"</span></h4>
                <ProductList searchedProduct={text}></ProductList>
        </div>
        </>
    );
};

export default FoundItemsPage;