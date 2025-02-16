import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/navigation/breadcrumbs/Breadcrumbs.jsx';
import ProductList from '../../components/product-list/ProductList.jsx';
import {getCategoryById} from "../../services/api/categoryService.js";

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const productsResponse = await getCategoryById(categoryId);
                const categoryNameResponse = await getCategoryById(categoryId);
                console.log(categoryNameResponse)
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
            <ProductList categoryId={categoryId} />
        </div>
    );
};

export default CategoryPage;
