import React, { useEffect, useState } from 'react';


const UserAccount = () => {
    const [email, setEmail] = useState('');

    useEffect(()=>{
        const mail = localStorage.getItem('email');
        setEmail(mail);
    },[]);

    return (
        <div className='content row'>
            <div className="content col-md-9" >
                <h1>Hello, {email}</h1>
            </div>
        </div>
    );
}


export default UserAccount;