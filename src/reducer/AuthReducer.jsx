export const initialAuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

export const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return initialAuthState;
        default:
            return state;
    }
};
