import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import './ProfileButton.css';

const ProfileButton = ({ iconUrl, openModal }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle
                id="profile-dropdown"
                className="profile-button"
                style={{ background: 'transparent', border: 'none' }} // Стили inline для кнопки
            >
                <FontAwesomeIcon icon={faUser} className="profile-icon" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={openModal}>Войти</Dropdown.Item>
                <Dropdown.Item href="/signup">Зарегистрироваться</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileButton;
