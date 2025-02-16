import ProductCard from "../product-card/ProductCard.jsx";
import React, {useEffect, useState} from "react";
import {useCart} from "../../contexts/CartContext.jsx";

import "./ProductShowcase.css"
import {getAllProducts} from "../../services/api/productService.js";

const ProductShowcase = ({fetchFunction}) => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response = await getAllProducts();
                setProducts(response.data.slice(0, 6));
            } catch (error) {
                console.error(`Ошибка при получении товаров (ProductShowcase)`, error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <div>
            <div className="product-showcase-container">
                {products.map((product, index) => (
                    <div className="product-grid" key={product.id}>
                        <ProductCard
                            product={{ product: product, quantity: 1 }}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductShowcase;