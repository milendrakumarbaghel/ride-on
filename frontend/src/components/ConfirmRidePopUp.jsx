import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: props.ride._id,
            otp: otp
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding')
        }
    }

    return (
        <div className='p-3 h-screen'>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                // props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-d1IOho0re20i3BGnNc3eS_FTzZptE4vxA&s" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>

                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                            {/* <p className='text-sm -mt-1 text-gray-600'>yha se utha lena</p> */}
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                            {/* <p className='text-sm -mt-1 text-gray-600'>Local ssse hai</p> */}
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            {/* <h3 className='text-lg font-medium'>₹ 193.20</h3> */}
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>

                </div>

                <div className='mt-5 w-full'>
                    <form onSubmit={submitHandler}>

                        <input
                            value={otp}
                            onChange={
                                (e) => setOtp(e.target.value)
                            }
                            type="text"
                            placeholder='Enter OTP'
                            className='bg-[#eee] px-5 py-3 font-mono text-lg rounded-lg w-full'
                        />

                        <button
                            className='w-full mt-4 bg-green-600 text-lg flex justify-center text-white font-semibold p-3 rounded-lg'
                        >
                            Confirm
                        </button>

                        <button
                            onClick={() => {
                                props.setConfirmRidePopupPanel(false)
                                props.setRidePopupPanel(false)
                            }}
                            className='w-full mt-1 bg-red-500 text-lg text-white font-semibold p-3 rounded-lg'
                        >
                            Cancel
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ConfirmRidePopUp
