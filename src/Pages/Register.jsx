import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../utils/auth';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await register(email, password, name);
            navigate('/'); // Redirect to the home page or another route after successful registration
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <img
                src="/amazon-black-logo.png"
                width={100}
                height={50}
                alt="Amazon"
                className="cursor-pointer"
            />
            <div className="w-[27vw] max-w-sm p-6 bg-white border border-gray-300 rounded-md">
                <h2 className="text-2xl font-semibold">Create account</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="mt-4" onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-bold">
                            Your name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 h-8 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold">
                            Mobile number or email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 h-8 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 h-8 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="text-xs text-gray-500">Passwords must be at least 6 characters.</span>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-bold">
                            Re-enter password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-3 py-2 h-8 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-center text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                        Continue
                    </button>
                    <p className="mt-4 text-xs text-center text-gray-500">
                        By creating an account, you agree to Amazon's{' '}
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
                </form>
            </div>
            <div className="mt-6 text-xs text-center border-t border-gray-300 pt-4">
                <p className="text-gray-500">Already have an account?</p>
                <Link to="/signin">
                    <button className="w-full max-w-sm px-4 py-2 mt-2 text-sm font-medium text-center text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Sign in
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Register;
