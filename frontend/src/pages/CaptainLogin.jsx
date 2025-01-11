import React, { useState } from 'react';
import { Link } from "react-router-dom";

const CaptainLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const submitHandler = () => {
        console.log(email, password);
        setCaptainData({
            email: email,
            password: password
        });

        console.log(captainData);
        setEmail('');
        setPassword('');
    }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
        <div>
            <img src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='uber-logo' className='w-20 '/>

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
                Join a fleet? <Link
                    to='/captain-signup'
                    className='text-blue-600'
                >
                    Register as a Captain
                </Link>
            </p>
        </div>

        <div>
            <Link
                to='/login'
                className='flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
                Sign in as User
            </Link>
        </div>
    </div>
  )
}

export default CaptainLogin
