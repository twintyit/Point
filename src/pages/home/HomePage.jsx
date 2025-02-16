import React from 'react';
import Carousel from '../../components/carousel/Carousel';
import './HomePage.css';
import Section from "../../components/section/Section.jsx";
import CategoryShowcase from "../../components/category-showcase/CategoryShowcase.jsx";
import ProductShowcase from "../../components/product-showcase/ProductShowcase.jsx";
import ImagesShowcase from "../../components/images-showcase/ImagesShowcase.jsx";
import BrandsShowcase from "../../components/brands-showcase/BrandsShowcase.jsx";

const HomePage = () => {
    return (
            <div>
                <div className='carousel-container'>
                    <Carousel />
                </div>
                <div className="home-container-bottom">
                   <Section title="Категорії" flug={false}>
                       <CategoryShowcase />
                   </Section>
                    <Section title="Акційні пропозиції" flug={true}>
                        <ProductShowcase />
                    </Section>
                    <Section title="Популярні бренди" flug={false}>
                        <BrandsShowcase />
                    </Section>
                    <Section title="Лідери продаж" flug={true}>
                        <ProductShowcase />
                    </Section>
                    <ImagesShowcase></ImagesShowcase>
                    <Section title="Новинки" flug={true}>
                        <ProductShowcase />
                    </Section>
                    <Section title="Рекомендовані товари" flug={true}>
                        <ProductShowcase />
                    </Section>
                </div>
            </div>
    );
};

export default HomePage;