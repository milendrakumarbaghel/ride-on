import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
          props.setWaitingForDriver(false)
        }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

        <div className='flex items-center justify-between'>
          <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />

          <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{ props.ride?.captain?.fullName?.firstName + " " + props.ride?.captain?.fullName?.lastName }</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ props.ride?.captain?.vehicle?.plate }</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
            <h1 className='text-lg font-semibold'> { props.ride?.otp } </h1>
          </div>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                {/* <p className='text-sm -mt-1 text-gray-600'>le jao</p> */}
                <p className='text-sm -mt-1 text-gray-600'>{ props.ride?.pickup }</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{ props.ride?.destination }</p>
                {/* <p className='text-sm -mt-1 text-gray-600'>aafjd</p> */}
              </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>₹{ props.ride?.fare } </h3>
                {/* <h3 className='text-lg font-medium'>₹ Paisa </h3> */}
                <p className='text-sm -mt-1 text-gray-600'>Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver
