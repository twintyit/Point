import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <Card className="product-card">
            <Card.Img variant="top" src={product.images[0]} className="card-img-top" />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    Цена: {product.price} ₴
                </Card.Text>
                <Card.Text>
                    Скидка: {product.discount}%
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={() => onAddToCart(product)}>
                        Добавить в корзину
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
