import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api/apiFunctions';
import './Sidebar.css';

const Sidebar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data.data);
            } catch (error) {
                console.error('Ошибка при получении категорий:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="sidebar">
            <ul className="list-unstyled">
                {categories.map(category => (
                    <li key={category.categoryId}>
                        <Link to={`/category/${category.categoryId}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
