import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../api/apiFunctions';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import './ProductDetail.css'

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => console.log(json))
        const fetchProductDetails = async () => {
            try {
                const response = await getProductDetails(productId);
                setProduct(response.data);
            } catch (error) {
                console.error(`Ошибка при получении информации о товаре ${productId}:`, error);
            }
        };

        fetchProductDetails();
    }, []);

    if (!product) return <div>Загрузка...</div>;

    return (
        <Container className="my-4">
            <Row>
                <Col md={4} className=" image-container">
                    <img src={product.images[0]} className="product-img" />
                </Col>
                <Col md={8}>
                    <Card className="product-info">
                        <Card.Body>
                            <h2>{product.name}</h2>
                            <Card.Subtitle className="mb-2 text-muted">{product.price} ₴</Card.Subtitle>
                            <Card.Text>{product.description}</Card.Text>
                            <Button variant="primary">Добавить в корзину</Button>
                            <ListGroup className="mt-3">
                                <ListGroup.Item>
                                    <strong>Stock Quantity:</strong> {product.stockQuantity}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Discount:</strong> {product.discount}%
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Tags:</strong> {product.tags.join(', ')}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
