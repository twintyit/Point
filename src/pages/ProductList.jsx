import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryProducts } from '../api/apiFunctions.jsx';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getCategoryProducts(categoryId);
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
                    <div className="col-md-4 mb-4" key={product.productId}> {/* Удаляем отступы и добавляем отступ снизу */}
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
