import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const submitHandler = () => {
        console.log(email, password);
        setUserData({
            email: email,
            password: password
        });

        console.log(userData);
        setEmail('');
        setPassword('');
    }

  return (
    <div className='bg-white h-screen p-7 w-screen mt-7 flex flex-col justify-between'>
        <div>
            <img src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='uber-logo' className='w-16 mb-12'/>

            <form onSubmit={(e) => {
                e.preventDefault();
                submitHandler();
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
                type='submit'
                className='flex items-center justify-center bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
                Sign in as Captain
            </Link>
        </div>
    </div>
  )
}

export default UserLogin
