import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../utils/auth'; // Import the signIn function

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            navigate('/'); // Redirect to the home page or another route after successful sign-in
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="flex mt-4 mb-2">
                <img
                    src="/amazon-black-logo.png"
                    width={100}
                    height={50}
                    alt="Amazon"
                    className="cursor-pointer"
                />
            <span className="text-black text-sm mt-[0.19rem]">.co.uk</span>
            </div>
            <div className="w-[27vw] max-w-sm p-5 bg-white border border-gray-300 rounded-md ">
                <h2 className="text-2xl font-semibold ">Sign in</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="mt-4" onSubmit={handleSignIn}>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-sm font-bold">
                            Email or mobile phone number
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3  h-8 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3  h-8 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-1 text-sm font-medium text-center text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        Continue
                    </button>
                    <p className="mt-4 text-xs text-center text-gray-500">
                        By continuing, you agree to Amazon's{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Conditions of Use & Sale
                        </a>
                        . Please see our{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Privacy Notice
                        </a>
                        , our{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Cookies Notice
                        </a> and our{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Interest-Based Ads Notice
                        </a>.
                    </p>
                    <div className="mt-4 text-xs border-b border-gray-300 pb-4">
                        <a href="#" className="text-blue-600 hover:underline">
                            Need help?
                        </a>
                    </div>
                    <div className="mt-3 text-xs">
                        <p className="text-sm font-bold mb-2">Buying for work?</p>
                        <a href="#" className="text-blue-600 hover:underline block">
                            <span className="text-sm">Shop on Amazon Business</span>
                        </a>
                    </div>
                </form>
            </div>
            <div className="mt-1 text-xs text-center w-[27vw] max-w-sm  pt-4">
                <div className="flex items-center justify-center relative w-full mb-4">
                    <div className="absolute inset-x-0 flex items-center justify-center">
                        <span className="px-2 text-gray-500 bg-white">New to Amazon?</span>
                    </div>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <Link to="/register">
                    <button className="w-full px-4 py-1 mt-1 text-sm font-medium text-center  border border-gray-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Create your Amazon account
                    </button>
                </Link>
                
            </div> 
        </div>
        <footer className="mt-8 p-10 text-center text-[12px]  bg-gradient-to-b from-[#F7F7F7] to-[#FFFFFF] border-t border-gray-200 mx-4">
            <div className="flex justify-center space-x-6">
                <a href="#" className=" text-blue-600 hover:text-[#C46242] hover:underline">Conditions of Use</a>
                <a href="#" className="text-blue-600 hover:text-[#C46242] hover:underline">Privacy Notice</a>
                <a href="#" className="text-blue-600 hover:text-[#C46242] hover:underline">Help</a>
                <a href="#" className="text-blue-600 hover:text-[#C46242] hover:underline">Cookies Notice</a>
                <a href="#" className="text-blue-600 hover:text-[#C46242] hover:underline">Interest-Based Ads Notice</a>
            </div>
            <p className="mt-2">© 1996-2024, Amazon.com, Inc. or its affiliates</p>
        </footer>
        </>
    );
};

export default SignIn;
