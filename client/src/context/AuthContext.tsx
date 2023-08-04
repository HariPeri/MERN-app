/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer, Dispatch, useMemo } from 'react';

// Define the types
type User = {
    email: string;
    password: string;
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

    console.log('Auth Context state: ', state);

    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
