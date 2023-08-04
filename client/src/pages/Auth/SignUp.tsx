import { useState } from 'react';
import Navbar from '../../shared/Navbar';

function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(email, password);
    };
    return (
        <div className="bg-blue-200 h-full text-black">
            <Navbar />
            <div className="flex justify-center mt-[200px]">
                <form
                    className="bg-white w-[500px] h-[400px] mx-auto "
                    onSubmit={handleSubmit}
                >
                    <div className="text-3xl ml-10 mt-10 font-bold">
                        Sign Up
                    </div>

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
                            className="mt-10 bg-blue-400 w-[125px] h-[50px] mx-auto rounded-xl text-white"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
