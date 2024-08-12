import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../api/apiFunctions';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
               // const response = await getProductDetails(productId);
                setProduct("coming soon...");

            } catch (error) {
                console.error(`Ошибка при получении информации о товаре ${productId}:`, error);
            }
        };

        fetchProductDetails();
    }, []);

    if (!product) return <div>Загрузка...</div>;

    return (
        <div className="container">
            <h2>{product}</h2>
        </div>
    );
};

export default ProductDetail;
