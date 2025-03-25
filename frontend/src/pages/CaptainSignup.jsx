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
    <div className='h-screen p-7 flex flex-col justify-between'>
        <div>
            {/* <img src='https://drive.google.com/file/d/1lA5hzub1xKH5vqmb4500jPA3PzlEVZxD/view?usp=sharing' alt='uber-logo' className='w-16 mb-5'/> */}
            <img src={rideon} alt='Ride On' className='w-16 mb-4' />

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

                <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
                <div className='flex gap-2 mb-3'>
                    <input
                        required
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        type='text'
                        placeholder='Vehicle Color'
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                    />
                    <input
                        required
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        type='text'
                        placeholder='Vehicle Plate Number'
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                    />
                </div>

                <div className='flex gap-2 mb-3'>
                    <input
                        required
                        value={vehicleCapacity}
                        onChange={(e) => setVehicleCapacity(e.target.value)}
                        type='number'
                        min="1"
                        placeholder='Vehicle Capacity'
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                    />
                    <select
                        required
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg'
                    >
                        <option value="">Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>

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
