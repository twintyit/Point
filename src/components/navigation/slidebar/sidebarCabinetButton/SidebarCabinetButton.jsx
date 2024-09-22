import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';

import './SidebarCabinetButton.css';


const SidebarCabinetButton = ({link}) => {
   const {userName} = useAuth(); 

    return (
        <Link to={link} className="link-container">
            <span className="material-icons icon-link">person</span>
            <div className='username-container'>
                <p className="name-text">User Name</p>
                <p className="email-text">{userName}</p>
            </div>
        </Link>
    );
}


export default SidebarCabinetButton;