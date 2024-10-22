import React from 'react';
import {useAuth} from "../../../contexts/AuthContext.jsx";


const UserAccount = () => {
    const {authState} = useAuth();
    return (
        <div className='content row'>
            <div className="content col-md-9" >
                <h1>Hello, {authState.userName}</h1>
            </div>
        </div>
    );
}


export default UserAccount;