import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import rideon from "../assets/ride-on.png";

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password,
        }

        // console.log(import.meta.env.VITE_BASE_URL)
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
            .then((response) => {
                const data = response.data;
                setUser(data.user)
                localStorage.setItem('token', data.token);
                navigate('/home');
            })
            .catch((error) => {
                console.log(error);
            })

        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
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
                                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Join Ride-On</h1>
                                <p className='text-gray-600'>Create your account to start your journey</p>
                            </div>

                            <form onSubmit={submitHandler} className='space-y-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                                    <div className='flex gap-3'>
                                        <div className='flex-1 relative'>
                                            <div className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center'>
                                                <i className='ri-user-line text-blue-600 text-sm'></i>
                                            </div>
                                            <input
                                                required
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                type='text'
                                                placeholder='First Name'
                                                className='w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300'
                                            />
                                        </div>
                                        <div className='flex-1 relative'>
                                            <div className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center'>
                                                <i className='ri-user-line text-blue-600 text-sm'></i>
                                            </div>
                                            <input
                                                required
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                type='text'
                                                placeholder='Last Name'
                                                className='w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300'
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                            placeholder='Create a password'
                                            className='w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300'
                                        />
                                    </div>
                                </div>

                                <button
                                    type='submit'
                                    className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group'
                                >
                                    <i className='ri-user-add-line group-hover:scale-110 transition-transform'></i>
                                    Create Account
                                </button>
                            </form>

                            <div className='mt-6 text-center'>
                                <p className='text-gray-600'>
                                    Already have an account?{' '}
                                    <Link
                                        to='/login'
                                        className='text-blue-600 hover:text-blue-700 font-medium transition-colors'
                                    >
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className='px-6 py-8 text-center'>
                    <p className='text-gray-500 text-xs leading-tight mb-4'>
                        This site is protected by reCAPTCHA and the{' '}
                        <span className='underline cursor-pointer'>Google Privacy Policy</span>{' '}
                        and{' '}
                        <span className='underline cursor-pointer'>Terms of Service</span>{' '}
                        apply.
                    </p>
                    <p className='text-gray-500 text-sm'>
                        © 2024 Ride-On. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserSignup
