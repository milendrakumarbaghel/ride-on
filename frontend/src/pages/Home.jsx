import React from 'react'
import { Link } from "react-router-dom";
import UserLogin from './UserLogin';

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1736517545267-92346c5fc0a8?q=80&w=2727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 w-full flex justify-between flex-col bg-red-400 '>
            <img src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='uber-logo' className='w-16 ml-8'/>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home
