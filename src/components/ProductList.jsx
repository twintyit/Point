import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryProducts, getAllProducts } from '../api/apiFunctions.jsx';
import ProductCard from './ProductCard.jsx';

const ProductList = ({ categoryId }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                console.log(categoryId)
                if (categoryId) {
                    response = await getCategoryProducts(categoryId);
                } else {
                    response = await getAllProducts();
                }
                setProducts(response.data);
            } catch (error) {
                console.error(`Ошибка при получении товаров категории ${categoryId}:`, error);
            }
        };

        fetchProducts();
    }, [categoryId]);

    const handleAddToCart = (product) => {
        // setCart([...cart, product]);
        alert(`comming soon...`);
    };

    return (
        <div className="container">
            <div className="row">
                {products.map(product => (
                    <div className="col-md-3 mb-4" key={product.productId}>
                        <ProductCard
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
