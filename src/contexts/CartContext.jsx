import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext'
import { addItemToCart, getCart, cleanCart, removeItemFromCart, deleteItemFromCart } from '../api/apiFunctions';
import {cartReducer, initialCartState} from "../reducer/CartReducer.jsx";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const { authState, getToken } = useAuth();
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    useEffect(() => {
        const fetchCart = async () => {
            if (authState.isAuthenticated) {
                const res = await getCart(authState.token);
                if (res.status.code === 0) {
                    dispatch({ type: 'SET_CART', payload: res.data.items });
                }
            } else {
                const storedCart = localStorage.getItem('cart');
                if (storedCart) {
                    dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart)});
                }
            }
        };
        fetchCart();
    }, [authState.isAuthenticated, authState.token]);

    useEffect(() => {
        if (!authState.isAuthenticated && state.cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    }, [state.cart, authState.isAuthenticated]);

    useEffect(() => {
        let tmpCart = JSON.parse(localStorage.getItem('cart'));
        if(tmpCart != null) {
            tmpCart.map((item) => addToCart(item));
            localStorage.setItem('cart', JSON.stringify([]));
        }
    }, [authState.isAuthenticated])

    const addToCart = async (item) => {
        if (authState.isAuthenticated) {
            await addItemToCart(item.product.id, authState.token);
            const res = await getCart(authState.token);
            if (res.status.code === 0) {
                dispatch({ type: 'ADD_ITEM', payload: item });
            }
        } else {
            await dispatch({ type: 'ADD_ITEM', payload: item });
        }
    };

    const removeFromCart = async (id) => {
        if (authState.isAuthenticated) {
            const token = getToken();
            await removeItemFromCart(id, token);
            const res = await getCart(token);
            if (res.status.code === 0) {
                dispatch({ type: 'SET_CART', payload: res.data.items });
            }
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: id });
        }
    };

    const deleteFromCart = async (id) => {
        if (authState.isAuthenticated) {
            await deleteItemFromCart(id, authState.token);
            const res = await getCart(authState.token);
            if (res.status.code === 0) {
                dispatch({ type: 'SET_CART', payload: res.data.items });
            }
        } else {
            dispatch({ type: 'DELETE_ITEM', payload: id });
        }
    };

    const clearCart = () => {
        if (authState.isAuthenticated) {
            cleanCart(authState.token);
        } else {
            localStorage.removeItem('cart');
        }
        dispatch({ type: 'CLEAR_CART' });
    };

    const getCount = () => {
       return state.cart.reduce((totalCount, item) => totalCount + item.quantity, 0);
    }

    return (
        <CartContext.Provider value={{
            state,
            dispatch,
            addToCart,
            removeFromCart,
            deleteFromCart,
            clearCart,
            getCount,
        }}>
            {children}
        </CartContext.Provider>
    );
};