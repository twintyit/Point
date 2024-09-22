import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'
import { addItemToCart, getCart, cleanCart, removeItemFromCart, deleteItemFromCart } from '../api/apiFunctions';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    
    const { isAuthenticated, getToken } = useAuth();
     const [cart, setCart] = useState(()=>{
        if(!isAuthenticated){
            const storedCart = localStorage.getItem('cart');
            if (storedCart != null) {
               return JSON.parse(storedCart);
            }
        }
         return [];
     });

    useEffect(() => {
        const fetchCart = async () =>{
            if (isAuthenticated) {
                const token = getToken();
                const res = await getCart(token);
           
                if(res.status.code === 0){
                    setCart(res.data.items);
                }
              
            } else {
                const storedCart = localStorage.getItem('cart');
                if (storedCart != null) {
                    setCart(JSON.parse(storedCart));
                }
            }
        }
        fetchCart();
    }, [cart]);

    const addToCart = async (item) => {
        if (isAuthenticated) {
            const token = getToken();
            const res1 = await addItemToCart(item.product.id, token);
            if (res1.status.code === 0) {
                const res2 = await getCart(token);
                if (res2.status.code === 0) {
                    setCart(res2.data.items);
                }
            }

        } else {
            setCart((prevCart) => {
                const existingItem = prevCart.find((cartItem) => cartItem.product.id === item.product.id);
                if (existingItem) {
                    return prevCart.map((cartItem) =>
                        cartItem.product.id === item.product.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                    );
                } else {
                    return [...prevCart, { product: item.product, quantity: 1 }];
                }
            });
        }  
    };

    const onQuantityChange = (id, newQuantity) => {
       const newCart = cart.map(
            (item) =>item.id === id ? 
            { ...item, quantity: newQuantity } : item);+

        setCart(newCart);
    };

    const getCount = () =>{
        return cart.length;
    }

    const removeFromCart = async (id) => {
        if(isAuthenticated){
            const token = getToken();
            const res1 = await removeItemFromCart(id, token);
            if (res1.status.code === 0) {
                const res2 = await getCart(token);
                if (res2.status.code === 0) {
                    setCart(res2.data.items);
                }
            }
        }else{
            setCart((prevCart) => {
                const existingItem = prevCart.find((cartItem) => cartItem.product.id === id);
                if (existingItem) {
                    return prevCart.map((cartItem) =>
                    cartItem.product.id === id
                    && cartItem.quantity > 1
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem
                    );
                } 
            });
        }
    };

    const deleteFromCart = async (id) => {
        if (isAuthenticated) {
            const token = getToken();
            await deleteItemFromCart(id, token);
        } else {
            setCart((prevCart) => {
                return prevCart.filter((cartItem) => cartItem.product.id !== id);
            });
        }
    };

    const clearCart = () => {
        if(isAuthenticated){
            cleanCart(getToken()); 
        } else {
            localStorage.removeItem('cart');
        }
       
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, getCount, deleteFromCart, onQuantityChange }}>
            {children}
        </CartContext.Provider>
    );
};
