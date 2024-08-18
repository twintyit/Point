import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import ProductList from '../components/ProductList'; 
import { getCategoryProducts, getCategoryName } from '../api/apiFunctions'; 

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const productsResponse = await getCategoryProducts(categoryId);
                const categoryNameResponse = await getCategoryName(categoryId);
                setProducts(productsResponse.data);
                setCategoryName(categoryNameResponse.data.name);
            } catch (error) {
                console.error('Ошибка при загрузке данных категории:', error);
            }
        };

        fetchCategoryData();
    }, [categoryId]);

    return (
        <div className="container">
            {/* <Breadcrumbs /> */}
            <h3>{categoryName}</h3>
            <p>{products.length} товаров найдено</p>
            <ProductList categoryId={categoryId} />
        </div>
    );
};

export default CategoryPage;
