export const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    userName: localStorage.getItem('user') || null,
    token: localStorage.getItem('token') || null,
};

export const authReducer = (authState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...authState,
                isAuthenticated: true,
                userName: action.payload.userName,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return {
                ...authState,
                isAuthenticated: false,
                userName: null,
                token: null,
            };
        case 'SET_USERNAME':
            return {
                userName: action.payload,
            };
        default:
            return authState;
    }
};