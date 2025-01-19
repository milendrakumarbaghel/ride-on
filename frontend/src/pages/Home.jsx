import React from 'react'
import { Form } from 'react-router-dom'
import { useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';


const Home = () => {

  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehiclePanel, setVehiclePanel ] = useState(false)
  const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)



  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitHandler');
  }

  useGSAP(function(){
    if(panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
        // opacity: 1
      })

      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        // opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function(){
    if(vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" className="w-16 absolute left-5 top-5" />

      <div className='h-screen w-screen'>
        {/* temporary image */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className='h-screen flex flex-col justify-end absolute top-0 w-full'>
          <div className='h-[30%] bg-white p-6 relative'>
            <h5
              ref={panelCloseRef}
              onClick={() => {
                setPanelOpen(false)
              }}
              className='absolute opacity-0 top-6 right-6 text-2xl'>
              <i className="ri-arrow-down-wide-line"></i>
            </h5>

            <h4 className='text-2xl font-semibold'>Find a trip</h4>

            <form onSubmit={(e) => {
                submitHandler(e);
              }} >

              <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>

              <input
                onClick={() => {
                  setPanelOpen(true)
                }}
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value)
                }}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
                type="text"
                placeholder="Enter pickup location"
              />

              <input
                onClick={() => {
                  setPanelOpen(true)
                }}
                value={dropoff}
                onChange={(e) => {
                  setDropoff(e.target.value)
                }}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
                type="text"
                placeholder="Enter dropoff location"
              />

            </form>
          </div>

          <div ref={panelRef} className='bg-white h-0'>
                <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel = {setVehiclePanel} />
          </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare} setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRide />
      </div>
    </div>
  )
}

export default Home
