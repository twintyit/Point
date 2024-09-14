import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveCart } from '../api/apiFunctions';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const getCount = () =>{
        return cart.length;
    }

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const saveCartToDB = () => {
        saveCart(cart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, saveCartToDB, getCount }}>
            {children}
        </CartContext.Provider>
    );
};
