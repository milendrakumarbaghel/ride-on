import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
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
                    <h2 className='text-lg font-medium'>Tera Baap</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>

                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            {/* <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p> */}
                            <p className='text-sm -mt-1 text-gray-600'>yha se utha lena</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            {/* <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p> */}
                            <p className='text-sm -mt-1 text-gray-600'>Local ssse hai</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            {/* <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3> */}
                            <h3 className='text-lg font-medium'>₹ 193.20</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>

                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={() => {
                        submitHandler(e);
                    }}>

                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            placeholder='Enter OTP'
                            className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-5'
                        />

                        <Link
                            to='/captain-riding'
                            className='w-full mt-5 bg-green-600 text-lg flex justify-center text-white font-semibold p-3 rounded-lg'
                        >
                            Confirm
                        </Link>

                        <button
                            onClick={() => {
                                props.setConfirmRidePopupPanel(false)
                                props.setRidePopupPanel(false)
                            }}
                            className='w-full mt-2 bg-red-500 text-lg text-white font-semibold p-3 rounded-lg'
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
