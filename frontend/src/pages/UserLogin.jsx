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
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden'>
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className='relative z-10 min-h-screen flex flex-col'>
                {/* Header */}
                <div className='px-6 py-8'>
                    <div className='flex items-center gap-3 mb-8'>
                        <img src={rideon} alt='Ride On' className='h-12 w-auto drop-shadow-lg' />
                        <span className="text-2xl font-bold text-gray-900">Ride-On</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className='flex-1 flex items-center justify-center px-6'>
                    <div className='w-full max-w-md'>
                        <div className='bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20'>
                            <div className='text-center mb-8'>
                                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
                                <p className='text-gray-600'>Sign in to your account to continue</p>
                            </div>

                            <form onSubmit={submitHandler} className='space-y-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                                    <div className='relative'>
                                        <div className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center'>
                                            <i className='ri-mail-line text-blue-600 text-sm'></i>
                                        </div>
                                        <input
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type='email'
                                            placeholder='Enter your email'
                                            className='w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                                    <div className='relative'>
                                        <div className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center'>
                                            <i className='ri-lock-line text-blue-600 text-sm'></i>
                                        </div>
                                        <input
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type='password'
                                            placeholder='Enter your password'
                                            className='w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300'
                                        />
                                    </div>
                                </div>

                                <button
                                    type='submit'
                                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group'
                                >
                                    <i className='ri-login-box-line group-hover:scale-110 transition-transform'></i>
                                    Sign In
                                </button>
                            </form>

                            <div className='mt-6 text-center'>
                                <p className='text-gray-600'>
                                    New here?{' '}
                                    <Link
                                        to='/signup'
                                        className='text-blue-600 hover:text-blue-700 font-medium transition-colors'
                                    >
                                        Create new account
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Captain Login Option */}
                        <div className='mt-6'>
                            <Link
                                to='/captain-login'
                                className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group border-2 border-transparent hover:border-green-500'
                            >
                                <i className='ri-steering-line group-hover:scale-110 transition-transform'></i>
                                Sign in as Captain
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className='px-6 py-8 text-center'>
                    <p className='text-gray-500 text-sm'>
                        © 2024 Ride-On. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
