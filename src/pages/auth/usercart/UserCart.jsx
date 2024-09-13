import React from 'react';
import { useCart } from '../../../contexts/CartContext';

const UserCart = () => {

    const { cart } = useCart();

    return (
        <div className='content row'>
            <div className="content col-md-9" >
                <h1>Hello from user cart</h1>
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.price} ₽
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default UserCart;