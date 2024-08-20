import React from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';
import './IconButtons.css';

const IconButtons = ({ isLoggedIn, onProfileClick, onCartClick, viewOrders, logout }) => {
    return (
        <div className="icon-buttons">
            {isLoggedIn ? (
                <>
                    <IconButton icon={faList} onClick={viewOrders} />
                    <IconButton icon={faBasketShopping} onClick={onCartClick} />
                    <IconButton icon={faRightFromBracket} onClick={logout} />
                </>
            ) : (
                <>
                    <IconButton icon={faUser} onClick={onProfileClick} />
                    <IconButton icon={faBasketShopping} onClick={onCartClick} />
                </>
            )}
        </div>
    );
};

export default IconButtons;
