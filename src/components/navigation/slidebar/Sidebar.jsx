import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../api/apiFunctions';
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
                    <li key={category.categoryId} className=''>
                        <Link to={`/category/${category.categoryId}`} className='d-flex align-items-center'>
                            <img src='https://cdn-icons-png.flaticon.com/512/3659/3659952.png' className='icon-category'></img>
                            <span>{category.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
