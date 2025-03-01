import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarCabinetButton from './sidebar-cabinet-button/SidebarCabinetButton';
import { useModal } from '../../../contexts/ModalContext';
import UserCart from '../../../pages/cart/Cart.jsx';

import './Sidebar.css';
import {getAllCategories} from "../../../services/api/categoryService.js";

const Sidebar = ({ mode, isVisible }) => {
    const [content, setContent] = useState([]);
    const { openModal } = useModal();

    const cabinet = [
        { id: 1, name: 'Orders', icon: 'subject', link: '/cabinet/orders' },
        { id: 2, name: 'Cart', icon: 'shopping_cart', link: '/cabinet' }
    ]

    useEffect(() => {
        if (mode === 'cabinet') {
            setContent(cabinet);
        }
        else if(mode === 'categories'){
            const fetchCategories = async () => {
                const data = await getAllCategories();
                setContent(data.data);
            };

            fetchCategories();
        }
    }, [mode]);
    
    return (
        <div className= {`sidebar ${!isVisible ? 'sidebar-hidden' : ''}`}>
            {mode === 'cabinet' ? (
                    <SidebarCabinetButton link={'/cabinet/account'}></SidebarCabinetButton>
                ) : (
                    <></>
            )}
            
            <ul className="list-unstyled">
                {content.map(item => (
                    <li key={item.id} className='list-item'>
                        {item.name === 'Cart' ? (
                            <a onClick={() => openModal(<UserCart></UserCart>)} className='d-flex align-items-center'>
                                <span className='material-icons icon-category'>shopping_cart</span>
                                <span>Cart</span>
                            </a>
                        ) : (
                            <Link to={item.link || `/category/${item.id}`} className='d-flex align-items-center'>
                                <img className="icon-category" src={item.imgUrl ? item.imgUrl[0] : 'https://simpleicon.com/wp-content/uploads/dashboard.svg'}/>
                                <span>{item.name}</span>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
