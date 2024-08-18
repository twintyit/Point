import React, { useState, useEffect } from 'react';
import { getSaleImages } from '../../api/apiFunctions';
import './Carousel.css'

const Carousel = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getSaleImages();
                const newImages = response.data.map((url, index) => ({
                    id: index,
                    url: url
                }));
                setImages(newImages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    >
                        <img src={image.url} className="d-block w-100" alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;