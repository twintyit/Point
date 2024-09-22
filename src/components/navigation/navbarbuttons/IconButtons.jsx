import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import {useCart } from '../../../contexts/CartContext.jsx'
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { useModal } from '../../../contexts/ModalContext.jsx';

import IconButton from './IconButton';
import UserCart from '../../../pages/auth/usercart/UserCart';
import LoginPage from '../../../pages/auth/loginpage/LoginPage.jsx';

import './IconButtons.css';

const IconButtons = () => {

    const [count, setCount] = useState(0);
    
    const navigate = useNavigate();
    const { getCount, cart } = useCart();
    const { isAuthenticated, logoutUser } = useAuth();
    const { openModal } = useModal();

    useEffect(()=>{
        setCount(getCount());
    }, [cart])

    return (
        <div className="icon-buttons">
            {isAuthenticated ? (
                <>
                    <IconButton icon={faList} onClick={() => navigate('/cabinet')} />
                    <IconButton icon={faBasketShopping} onClick={()=> openModal(<UserCart></UserCart>)} totalItems={count} />
                    <IconButton icon={faRightFromBracket} onClick={() => logoutUser('/')} />
                </>
            ) : (
                <>
                        <IconButton icon={faUser} onClick={() => { openModal (<LoginPage></LoginPage>) }} />
                        <IconButton icon={faBasketShopping} onClick={() => openModal(<UserCart></UserCart>)} totalItems={count}  />
                </>
            )}
        </div>
    );
};

export default IconButtons;
