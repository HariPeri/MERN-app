import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import useLogin from '../../hooks/useLogin';
import useAuthContext from '../../hooks/useAuthContext';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login, error, isLoading } = useLogin();
    const navigate = useNavigate();

    const {
        state: { user },
    } = useAuthContext();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await login(email, password);
            // The code inside this block will run after the login function completes successfully
            navigate('/');
        } catch (err) {
            setEmail('');
            setPassword('');
        }
    };
    return (
        <div className="bg-blue-200 h-full text-black">
            <Navbar />
            <div className="flex justify-center mt-[200px]">
                <form
                    className="bg-white w-[500px] h-[400px] mx-auto "
                    onSubmit={handleSubmit}
                >
                    <div className="text-3xl ml-10 mt-10 font-bold">Login</div>

                    <div className="flex flex-col">
                        <label className="text-xl ml-10 mt-10" htmlFor="email">
                            Email:
                            <input
                                className="w-[300px] pl-2 ml-2 border-blue-200 border-2 rounded-lg"
                                id="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col">
                        <label
                            className="text-xl ml-10 mt-10"
                            htmlFor="password"
                        >
                            Password:
                            <input
                                className="pl-2 ml-2 w-[263px]  border-blue-200 border-2 rounded-lg"
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-10 bg-blue-400 w-[125px] h-[50px] mx-auto rounded-xl text-white"
                        >
                            Login
                        </button>
                        {error && (
                            <div className="ml-4 mt-4 text-red-400 w-[29rem] rounded-md p-4 text-xl bg-red-100 border-2 border-red-400">
                                {error}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
