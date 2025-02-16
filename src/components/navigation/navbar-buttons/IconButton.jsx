import React, { useEffect } from 'react';
import './IconButton.css';

const IconButton = ({ icon, onClick, totalItems, title}) => {

    return (
        <>
            {totalItems > 0 ? (
                <div className="cart-button" >
                    <button className="icon-button" onClick={onClick} title={title}>
                        <i className="material-icons icon">{icon}</i>
                        <span className="cart-count">{totalItems}</span>
                    </button >
                </div>
            ) : (
                    <div className="cart-button">
                        <button className="icon-button" onClick={onClick} title={title}>
                            <i className="material-icons icon">{icon}</i>
                            <p className="icon-text">{title}</p>
                        </button>
                    </div>
            )}
        </>

    );
};

export default IconButton;