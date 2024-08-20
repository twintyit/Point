import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';

const IconButton = ({ icon, onClick }) => {
    return (
        <button className="icon-button" onClick={onClick}>
            <FontAwesomeIcon icon={icon} className="icon" />
        </button>
    );
};

export default IconButton;