import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <Link to={`/product/${product.product.id}`} className="product-link">
            <div className="card product-card">
                {product.product.discount > 0 && (
                    <div className="discount-badge">
                        -{product.product.discount}%
                    </div>
                )}
                <img src={product.product.images[0]} alt={product.product.name} className="card-img-top"/>
                <div className="card-body flex-row">
                    <div>
                        <p className="card-text name">{`${product.product.name}`}</p>
                        {product.product.discount ? (
                            <div>
                                <p className="card-text text-muted original-price-product">
                                    {product.product.price.toLocaleString()} ₴
                                </p>
                                <p className="card-textred text-danger">
                                    <span
                                        className="discount-price-product">{Math.floor(product.product.price - (product.product.price * product.product.discount / 100)).toLocaleString()} </span>
                                    ₴
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="card-text price-product">
                                    {product.product.price.toLocaleString()} ₴
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                        <button
                            className="btn"
                            onClick={(e) => {
                                e.preventDefault();
                                onAddToCart(product);
                            }}
                        >
                            <i className="material-icons cart-product-icon">shopping_cart</i>

                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
        ;
};

export default ProductCard;
