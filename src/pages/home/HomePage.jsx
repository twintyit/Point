import React, { useState, useEffect } from 'react';
import Carousel from '../../components/carousel/Carousel';
import ProductList from '../../components/product-list/ProductList.jsx';
import './HomePage.css';
import Section from "../../components/section/Section.jsx";
import CategoryList from "../../components/category-list/CategoryList.jsx";
import ProductShowcase from "../../components/product-showcase/ProductShowcase.jsx";

const HomePage = () => {
    return (
            <div>
                <div className='carousel-container'>
                    <Carousel />
                </div>
                <div className="home-container-bottom">
                   <Section title="Категорії" flug={false}>
                       <CategoryList />
                   </Section>
                    <Section title="Акційні пропозиції" flug={true}>
                        <ProductShowcase />
                    </Section>
                    <Section title="Популярні бренди" flug={false}>
                        <CategoryList />
                    </Section>
                    <Section title="Лідери продаж" flug={true}>
                        <ProductShowcase />
                    </Section>
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