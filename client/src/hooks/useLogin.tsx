import { useState } from 'react';
import useAuthContext from './useAuthContext';

const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3001/api/user/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }); // potentially refactor with proxy so that the call is only /api/user/signup

        const json = await response.json(); // will send back the email and jwt if sign up is successful, otherwise sends back an error

        // Use error code to identify we got a successful signup

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            // save the user to local storage [JSON WEB TOKEN and Email]

            localStorage.setItem('user', JSON.stringify(json));

            // update auth context

            dispatch({ type: 'LOGIN', payload: json });

            // set loading to false since all things have completed

            setIsLoading(false);
        }
    };
    return { login, isLoading, error };
};

export default useLogin;
