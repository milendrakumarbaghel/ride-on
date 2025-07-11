import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useState } from 'react'
import { useRef } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import MapDirectionTracker from '../components/MapDirectionTracker'
import rideon from "../assets/ride-on.png";



const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)


    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])


    return (
        <div className='h-screen relative'>

            <div className='fixed p-6 top-0  flex items-center justify-between w-screen'>
                {/* <img className='w-16' src="https://drive.google.com/file/d/1lA5hzub1xKH5vqmb4500jPA3PzlEVZxD/view?usp=sharing" alt="" /> */}
                <img src={rideon} alt='Ride On' className='w-16 mb-12' />

                <Link to='/home' className='h10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className='h-4/5'>
                <MapDirectionTracker
                    pickup={rideData?.pickup}
                    destination={rideData?.destination}
                />
            </div>

            <div className='h-1/5 p-6 bg-yellow-400 relative flex items-center justify-between'
                onClick={() => {
                    setFinishRidePanel(true)
                }}
            >
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {

                }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>

            <div ref={finishRidePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white py-10 pt-12'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel}
                />
            </div>

        </div>
    )
}

export default CaptainRiding
