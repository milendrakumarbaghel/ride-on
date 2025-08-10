import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import rideon from "../assets/ride-on.png";

const CaptainSignup = () => {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');

        const [vehicleColor, setVehicleColor] = useState('');
        const [vehiclePlate, setVehiclePlate] = useState('');
        const [vehicleCapacity, setVehicleCapacity] = useState('');
        const [vehicleType, setVehicleType] = useState('');

        const { captain, setCaptain } = useContext(CaptainDataContext);

        const navigate = useNavigate();

        const submitHandler = async (e) => {
            e.preventDefault();
            const newCaptain = {
                fullName:{
                    firstName: firstName,
                    lastName: lastName
                },
                email: email,
                password: password,

                vehicle: {
                    color: vehicleColor,
                    plate: vehiclePlate,
                    capacity: vehicleCapacity,
                    vehicleType: vehicleType
                }
            }

            // console.log(captainData);

            const response = axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)
            .then((response) => {
                const data = response.data;
                setCaptain(data.captain)
                localStorage.setItem('token', data.token);
                navigate('/captain-home');
            })
            .catch((error) => {
                console.log(error);
            })

            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setVehicleColor('');
            setVehiclePlate('');
            setVehicleCapacity('');
            setVehicleType('');
        }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden'>
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
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
            <div className='flex-1 flex items-center justify-center px-6 py-8'>
                <div className='w-full max-w-2xl'>
                    <div className='bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20'>
                        <div className='text-center mb-8'>
                            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <i className='ri-steering-line text-3xl text-green-600'></i>
                            </div>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Join Our Fleet</h1>
                            <p className='text-gray-600'>Become a Ride-On captain and start earning</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-6'>
                            {/* Personal Information Section */}
                            <div className='bg-gray-50 p-6 rounded-2xl'>
                                <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                                    <i className='ri-user-line text-green-600'></i>
                                    Personal Information
                                </h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
                                        <input
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            type='text'
                                            placeholder='Enter first name'
                                            className='w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-300'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
                                        <input
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            type='text'
                                            placeholder='Enter last name'
                                            className='w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-300'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Account Information Section */}
                            <div className='bg-gray-50 p-6 rounded-2xl'>
                                <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                                    <i className='ri-shield-user-line text-green-600'></i>
                                    Account Information
                                </h3>
                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                                        <input
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type='email'
                                            placeholder='Enter your email'
                                            className='w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-300'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                                        <input
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type='password'
                                            placeholder='Create a password'
                                            className='w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-300'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Information Section */}
                            <div className='bg-gray-50 p-6 rounded-2xl'>
                                <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                                    <i className='ri-car-line text-green-600'></i>
                                    Vehicle Information
                                </h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Vehicle Color</label>
                                        <input
                                            required
                                            value={vehicleColor}
                                            onChange={(e) => setVehicleColor(e.target.value)}
                                            type='text'
                                            placeholder='e.g., Red, Blue'
                                            className='w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-300'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>License Plate</label>
                                        <input
                                            required
                                            value={vehiclePlate}
                                            onChange={(e) => setVehiclePlate(e.target.value)}
                                            type='text'
                                            placeholder='Enter plate number'
                                            className='w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-300'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Passenger Capacity</label>
                                        <input
                                            required
                                            value={vehicleCapacity}
                                            onChange={(e) => setVehicleCapacity(e.target.value)}
                                            type='number'
                                            min="1"
                                            placeholder='Number of seats'
                                            className='w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-300'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Vehicle Type</label>
                                        <select
                                            required
                                            value={vehicleType}
                                            onChange={(e) => setVehicleType(e.target.value)}
                                            className='w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-300'
                                        >
                                            <option value="">Select vehicle type</option>
                                            <option value="car">Car</option>
                                            <option value="motorcycle">Motorcycle</option>
                                            <option value="auto">Auto</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                type='submit'
                                className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group'
                            >
                                <i className='ri-user-add-line group-hover:scale-110 transition-transform'></i>
                                Join as Captain
                            </button>
                        </form>

                        <div className='mt-6 text-center'>
                            <p className='text-gray-600'>
                                Already have an account?{' '}
                                <Link
                                    to='/captain-login'
                                    className='text-green-600 hover:text-green-700 font-medium transition-colors'
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

export default CaptainSignup
