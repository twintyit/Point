import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';

const IconButton = ({ icon, onClick, totalItems }) => {

    return (
        <>
            {totalItems > 0 ? (
                <div className="cart-button">
                    <button className="icon-button" onClick={onClick} >
                        <FontAwesomeIcon icon={icon} className="icon" />
                        <span className="cart-count">{totalItems}</span>
                    </button >
                </div>
            ) : (
                    <div className="cart-button">
                        <button className="icon-button" onClick={onClick} >
                            <FontAwesomeIcon icon={icon} className="icon" />
                        </button >
                    </div>
            )}
        </>

    );
};

export default IconButton;