import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


const FinishRide = (props) => {
  const [isRideEnded, setIsRideEnded] = useState(false)
  const navigate = useNavigate()

  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId: props.ride._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(response.status === 200) {
      setIsRideEnded(true)
    }
  }

  useEffect(() => {
    if (isRideEnded) {
      navigate('/captain-home');
    }
  }, [isRideEnded])

  return (
    <div className='p-1'>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setFinishRidePanel(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

      <div className='flex items-center justify-between mt-4 p-3 border-2 border-yellow-400 rounded-lg'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369991.png" alt="" />
          <h2 className='text-lg font-medium capitalize'>{props.ride?.user?.fullName?.firstName + " " + props.ride?.user?.fullName?.lastName}</h2>
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

        <div className='p-1 mt-10 w-full'>

          <button
            onClick={endRide}
            className='w-full mt-5 bg-green-600 text-lg flex justify-center text-white font-semibold p-3 rounded-lg'
          >
            Finish Ride
          </button>

          <p className='p-2 mt-5 text-[75%] font-medium'>Click on Finish ride button if payment has been completed.</p>

        </div>

      </div>
    </div>
  )
}

export default FinishRide
