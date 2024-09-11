import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SidebarCabinetButton.css';


const SidebarCabinetButton = ({link}) => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const mail = localStorage.getItem('email');
        setEmail(mail);
    }, []);

    return (
        <Link to={link} className="link-container">
            <span className="material-icons icon-link">person</span>
            <div className='username-container'>
                <p className="name-text">User Name</p>
                <p className="email-text">{email}</p>
            </div>
        </Link>
    );
}


export default SidebarCabinetButton;