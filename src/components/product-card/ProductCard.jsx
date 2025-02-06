import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <Link to={`/product/${product.product.id}`} className="text-decoration-none">
            <div className="card product-card">
                <div className="img-container">
                    <img src={product.product.images[0]} alt={product.product.name} className="card-img-top"/>
                </div>

                <div className="card-body">
                    <p className="card-text name">{product.product.name}</p>

                    {product.product.discount ? (
                        <div className="price-container">
                            <p className="discount-price">
                                ₴{Math.floor(product.product.price - (product.product.price * product.product.discount / 100)).toLocaleString()}
                            </p>
                            <p className="original-price">₴{product.product.price.toLocaleString()}</p>

                        </div>
                    ) : (
                        <p className="price">{product.product.price.toLocaleString()} ₴</p>
                    )}

                    <div className="card-star-rating">Оценка товара</div>
                    <button
                        className="btn add-to-cart "
                        onClick={(e) => {
                            e.preventDefault();
                            onAddToCart(product);
                        }}
                    >
                       Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
