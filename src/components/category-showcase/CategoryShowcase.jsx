import React, {useEffect, useState} from "react";
import {getAllCategories} from "../../services/apiService.js";
import CategoryCard from "../category-card/CategoryCard.jsx";
import "./CategoryShowcase.css"

const CategoryShowcase = () => {

    const [categories,setCategories] = useState([]);
    const [visibleCategories, setVisibleCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAllCategories();
            setCategories(data);
        };

        fetchCategories();
    },[]);

    useEffect(() => {
        setVisibleCategories(categories.slice(0, 8));
    },[categories]);


    return (
        <div className="category-showcase-container">
            {visibleCategories && visibleCategories.map((category) => (
                <div key={category.id} className="category-card">
                    <CategoryCard category={category}/>
                </div>
            ))}
        </div>
    );
};

export default CategoryShowcase;