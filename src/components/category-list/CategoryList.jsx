import React, {useEffect, useState} from "react";
import "./CategoryList.css"
import {getCategories} from "../../api/apiFunctions.jsx";
import CategoryCard from "../category-card/CategoryCard.jsx";
import {Link} from "react-router-dom";

const CategoryList = () => {

    const [categories,setCategories] = useState([]);
    const [visibleCategories, setVisibleCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data.data);
        };

        fetchCategories();
    },[]);

    useEffect(() => {
        setVisibleCategories(categories.slice(0, 8));
    },[categories]);


    return (
        <div className="category-list-container">
            {visibleCategories && visibleCategories.map((category) => (
                <div key={category.id} className="category-card">
                    <CategoryCard category={category}/>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;