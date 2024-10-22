import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {useCart } from '../../../contexts/CartContext.jsx'
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { useModal } from '../../../contexts/ModalContext.jsx';

import IconButton from './IconButton';
import UserCart from '../../../pages/cart/Cart.jsx';
import LoginPage from '../../../pages/auth/login-page/LoginPage.jsx';

import './IconButtons.css';

const IconButtons = () => {

    const [count, setCount] = useState(0);
    
    const navigate = useNavigate();
    const { state, getCount } = useCart();
    const { isAuthenticated, logoutUser } = useAuth();
    const { openModal } = useModal();

    useEffect(()=>{
        setCount(getCount());
    }, [state.cart])

    return (
        <div className="icon-buttons">
            {isAuthenticated ? (
                <>
                    <IconButton icon={"admin_panel_settings"} onClick={() => navigate('/admin')} title={'admin'} />
                    <IconButton icon={"format_list_bulleted"} onClick={() => navigate('/cabinet')} title={'cabinet'}/>
                    <IconButton icon={"shopping_cart"} onClick={()=> openModal(<UserCart></UserCart>)} totalItems={count} title='cart' />
                    <IconButton icon={"logout"} onClick={() => logoutUser('/')} title='logout'/>
                </>
            ) : (
                <>
                    <IconButton icon={"person"} onClick={() => { openModal (<LoginPage></LoginPage>) }} title='login' />
                    <IconButton icon={"shopping_cart"} onClick={() => openModal(<UserCart></UserCart>)} totalItems={count} title='cart' />
                </>
            )}
        </div>
    );
};

export default IconButtons;
