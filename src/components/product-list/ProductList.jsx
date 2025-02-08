import React, { useState, useEffect } from 'react';
import { getCategoryProducts, getAllProducts } from '../../services/apiService.js';
import ProductCard from '../product-card/ProductCard.jsx';
import { useCart } from '../../contexts/CartContext.jsx';
import { searchProduct } from '../../services/apiService.js';
import "./ProductList.css"

const ProductList = ({ categoryId, searchedProduct }) => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                if (categoryId) {
                    response = await getCategoryProducts(categoryId);
                } else if (searchedProduct){
                    response = await searchProduct(searchedProduct);
                } 
                else {
                    response = await getAllProducts();
                }
                setProducts(response.data);
            } catch (error) {
                console.error(`Ошибка при получении товаров категории ${categoryId}:`, error);
            }
        };

        fetchProducts();
    }, [categoryId, searchedProduct]);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <div className="container">
            <div className="row">
                <p>{products.length} товаров найдено</p>
                {products.map(product => (
                    <div className="col-6 col-sm-3" key={product.id}>
                        <ProductCard
                            product={ {product: product, quantity: 1} }
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
