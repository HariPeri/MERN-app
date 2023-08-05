/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer, Dispatch, useMemo, useEffect } from 'react';

// Define the types
type User = {
    email: string;
    token: string;
};

type AuthState = {
    user: User | null;
};

type AuthAction = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' };

type AuthContextType = {
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
};

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

// Reducer to handle authentication state changes
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

type AuthContextProviderProps = {
    children: React.ReactNode; // Define children prop with ReactNode type
};

// AuthContextProvider
export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
        // use a TypeGuard
        const userJson = localStorage.getItem('user');

        const user = userJson ? JSON.parse(userJson) : null;

        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);

    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    console.log('Auth Context state: ', state);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
