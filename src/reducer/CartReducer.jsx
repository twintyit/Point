// Определяем начальное состояние
export const initialCartState = {
    cart: [],
    total: 0,
    showNotification: false
};

// Редюсер для обработки изменений состояния
export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            const totalPrice = action.payload.reduce((total, item) => total + item.product.price * item.quantity, 0);
            return {
                ...state,
                cart: action.payload,
                total: totalPrice,
            };
        case 'ADD_ITEM':
            const existingItem = state.cart.find(item => item.product.id === action.payload.product.id);
            const updatedCart = existingItem
                ? state.cart.map(item =>
                    item.product.id === action.payload.product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...state.cart, { ...action.payload, quantity: 1 }];
            return {
                ...state,
                cart: updatedCart,
                total: updatedCart.reduce((total, item) => total + item.product.price * item.quantity, 0),
                showNotification: true,
            };
        case 'REMOVE_ITEM':
            const updatedRemoveCart = state.cart.map(item =>
                item.product.id === action.payload
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            );
            return {
                ...state,
                cart: updatedRemoveCart,
                total: updatedRemoveCart.reduce((total, item) => total + item.product.price * item.quantity, 0),
            };
        case 'DELETE_ITEM':
            const updatedDeleteCart = state.cart.filter(item => item.product.id !== action.payload);
            return {
                ...state,
                cart: updatedDeleteCart,
                total: updatedDeleteCart.reduce((total, item) => total + item.product.price * item.quantity, 0),
            };
        case 'CLEAR_CART':
            return { ...state, cart: [], total: 0 };
        case 'SHOW_NOTIFICATION':
            return { ...state, showNotification: action.payload };
        default:
            return state;
    }
};