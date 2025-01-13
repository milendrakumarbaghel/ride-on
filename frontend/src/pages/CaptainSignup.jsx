import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const CaptainSignup = () => {

    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [captainData, setCaptainData] = useState({});

        const submitHandler = (e) => {
            e.preventDefault();
            setCaptainData({
                fullName:{
                    firstName: firstName,
                    lastName: lastName
                },
                email: email,
                password: password,
            })

            console.log(captainData);

            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
        }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
        <div>
            <img src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='uber-logo' className='w-16 mb-12'/>

            <form onSubmit={(e) => {
                // e.preventDefault();
                submitHandler(e);
            }}>

                <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
                <div className='flex gap-4 mb-6'>
                    <input
                        required
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                        type='text'
                        placeholder='First Name'
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                    />
                    <input
                        required
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                        type='text'
                        placeholder='Last Name'
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                    />
                </div>

                <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
                <input
                    required
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    type='email'
                    placeholder='Email'
                    className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
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
                    className='bg-[#eeeeee]  mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                />

                <button
                    type='submit'
                    className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-lg'>
                    Create new Account
                </button>
            </form>
            <p className='text-center'>
                Already have an Account? <Link
                    to='/captain-login'
                    className='text-blue-600'
                >
                    Login Here
                </Link>
            </p>
        </div>

        <div>
            <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
        </div>
    </div>
  )
}

export default CaptainSignup
