import React, { useState, useEffect } from 'react';
import { getCategoryProducts, getAllProducts } from '../api/apiFunctions.jsx';
import ProductCard from './productCard/ProductCard.jsx';
import { useCart } from '../contexts/CartContext.jsx';

const ProductList = ({ categoryId }) => {

    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                if (categoryId) {
                    response = await getCategoryProducts(categoryId);
                    console.log(response);
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
        addToCart(product);
    };

    return (
        <div className="container">
            <div className="row">
                {products.map(product => (
                    <div className="col-md-3 mb-4" key={product.id}>
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
