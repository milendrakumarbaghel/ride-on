import React from 'react'
import { Link } from 'react-router-dom'

const CaptainHome = () => {
  return (
    <div className='h-screen'>

      <div className='fixed p-4 top-0  flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <Link to='/home' className='h10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-1/2'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className='h-1/2 p-4'>

        <div className='flex items-center justify-between'>
          <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />

          <div className='text-right'>
            <h2 className='text-lg font-medium'>Milendra</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP10 AB 1234</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className='h-1/2 p-4'>
          <div>
            <div>
              <img src="" alt="" />
              <h4>Abhishek Rajput</h4>
            </div>

            <div>
              <h4>₹295.20</h4>
              <p>Earned</p>
            </div>
          </div>

          <div>
            <div className='text-center'>
              <i className="ri-timer-2-line"></i>
              <h5>10.5</h5>
              <p>Hours Online</p>
            </div>
            <div>
              <i className="ri-speed-up-line"></i>
              <h5>10.5</h5>
              <p>Hours Online</p>
            </div>
            <div>
              <i className="ri-booklet-line"></i>
              <h5>10.5</h5>
              <p>Hours Online</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default CaptainHome
