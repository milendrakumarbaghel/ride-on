import React from 'react';
import { Link, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import rideon from "../assets/ride-on.png";

const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const captain = localStorage.getItem('captain');

        if (token && user && !captain) {
            navigate('/home', { replace: true });
        } else if (token && captain && !user) {
            navigate('/captain-home', { replace: true });
        }
    }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(email, password);

        const userData = {
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

            if (response.status === 200) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/home', { replace: true });

                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.log("Login failed", error);
        }
    }

    return (
        <div className='min-h-screen w-full px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 xl:px-16 flex flex-col justify-between'>
            {/* Main Content Container */}
            <div className='w-full max-w-md mx-auto flex-1 flex flex-col justify-center'>
                {/* Logo */}
                <div className='text-center mb-8 sm:mb-10 md:mb-12'>
                    <img
                        src={rideon}
                        alt='Ride On'
                        className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto'
                    />
                </div>

                {/* Login Form */}
                <form onSubmit={(e) => {
                    submitHandler(e);
                }} className='space-y-4 sm:space-y-5 md:space-y-6'>

                    {/* Email Field */}
                    <div>
                        <h3 className='text-base sm:text-lg font-medium mb-2 text-gray-700'>
                            Enter your email
                        </h3>
                        <input
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            type='email'
                            placeholder='Email'
                            className='bg-gray-100 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 w-full text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <h3 className='text-base sm:text-lg font-medium mb-2 text-gray-700'>
                            Enter your password
                        </h3>
                        <input
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            type='password'
                            placeholder='Password'
                            className='bg-gray-100 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 w-full text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type='submit'
                        className='bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg px-4 py-2.5 sm:py-3 w-full text-base sm:text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-6 sm:mt-8'>
                        Login
                    </button>
                </form>

                {/* Sign up link */}
                <p className='text-center text-sm sm:text-base text-gray-600 mt-4 sm:mt-6'>
                    New here?
                    <Link
                        to='/signup'
                        className='text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors duration-200'
                    >
                        Create new Account
                    </Link>
                </p>
            </div>

            {/* Captain Login Button */}
            <div className='w-full max-w-md mx-auto mt-8 sm:mt-12'>
                <Link
                    to='/captain-login'
                    className='flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-4 py-2.5 sm:py-3 w-full text-base sm:text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2'>
                    Sign in as Captain
                </Link>
            </div>
        </div>
    )
}

export default UserLogin
