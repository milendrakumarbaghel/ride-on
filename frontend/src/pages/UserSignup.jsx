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

                {/* Signup Form */}
                <form onSubmit={(e) => {
                    submitHandler(e);
                }} className='space-y-4 sm:space-y-5 md:space-y-6'>

                    {/* Name Section */}
                    <div>
                        <h3 className='text-base sm:text-lg font-medium mb-2 sm:mb-3 text-gray-700'>
                            Enter your name
                        </h3>
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                            <input
                                required
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                                type='text'
                                placeholder='First Name'
                                className='bg-gray-100 flex-1 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                            />
                            <input
                                required
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                                type='text'
                                placeholder='Last Name'
                                className='bg-gray-100 flex-1 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                            />
                        </div>
                    </div>

                    {/* Email Section */}
                    <div>
                        <h3 className='text-base sm:text-lg font-medium mb-2 sm:mb-3 text-gray-700'>
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

                    {/* Password Section */}
                    <div>
                        <h3 className='text-base sm:text-lg font-medium mb-2 sm:mb-3 text-gray-700'>
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

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg px-4 py-2.5 sm:py-3 w-full text-base sm:text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-6 sm:mt-8'>
                        Create new Account
                    </button>
                </form>

                {/* Login Link */}
                <p className='text-center text-sm sm:text-base text-gray-600 mt-4 sm:mt-6'>
                    Already have an Account?
                    <Link
                        to='/login'
                        className='text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors duration-200'
                    >
                        Login Here
                    </Link>
                </p>
            </div>

            {/* Footer */}
            <div className='w-full max-w-md mx-auto mt-6 sm:mt-8'>
                <p className='text-xs sm:text-sm leading-tight text-gray-500 text-center px-2'>
                    This site is protected by reCAPTCHA and the
                    <span className='underline hover:text-gray-700 cursor-pointer transition-colors duration-200'> Google Privacy Policy</span> and
                    <span className='underline hover:text-gray-700 cursor-pointer transition-colors duration-200'> Terms of Service</span> apply.
                </p>
            </div>
        </div>
    )
}

export default UserSignup
