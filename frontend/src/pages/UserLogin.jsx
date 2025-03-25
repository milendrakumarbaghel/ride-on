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
        <div className='h-screen p-7 flex flex-col justify-between'>
            <div>
                <img src={rideon} alt='Ride On' className='w-16 mb-12' />

                <form onSubmit={(e) => {
                    submitHandler(e);
                }}>
                    <h3 className='text-lg font-medium mb-2'>Enter your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        type='email'
                        placeholder='Email'
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter your password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type='password'
                        placeholder='Password'
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    />

                    <button
                        type='submit'
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
                        Login
                    </button>
                </form>
                <p className='text-center'>
                    New here? <Link
                        to='/signup'
                        className='text-blue-600'
                    >
                        Create new Account
                    </Link>
                </p>
            </div>

            <div>
                <Link
                    to='/captain-login'
                    className='flex items-center justify-center bg-[#10b461] text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
                    Sign in as Captain
                </Link>
            </div>
        </div>
    )
}

export default UserLogin
