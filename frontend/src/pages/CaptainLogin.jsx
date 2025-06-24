import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import rideon from "../assets/ride-on.png";

const CaptainLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

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
        const captainData = ({
            email: email,
            password: password
        });

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

            if (response.status === 200) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                localStorage.setItem('captain', JSON.stringify(data.captain));
                navigate('/captain-home', { replace: true });
            }

            setEmail('');
            setPassword('');
        } catch (error) {
            console.error("Login failed:", error);
            // You might want to show an error message to the user here
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
                        className='w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto'
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
                            className='bg-gray-100 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 w-full text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200'
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
                            className='bg-gray-100 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 w-full text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200'
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
                    Join a fleet?
                    <Link
                        to='/captain-signup'
                        className='text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors duration-200'
                    >
                        Register as a Captain
                    </Link>
                </p>
            </div>

            {/* User Login Button */}
            <div className='w-full max-w-md mx-auto mt-8 sm:mt-12'>
                <Link
                    to='/login'
                    className='flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg px-4 py-2.5 sm:py-3 w-full text-base sm:text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2'>
                    Sign in as User
                </Link>
            </div>
        </div>
    )
}

export default CaptainLogin
