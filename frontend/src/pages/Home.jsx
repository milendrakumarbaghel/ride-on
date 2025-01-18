import React from 'react'
import { Form } from 'react-router-dom'
import { useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'


const Home = () => {

  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitHandler');
  }

  useGSAP(function(){
    if(panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
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

  return (
    <div className='h-screen relative'>
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

          <div ref={panelRef} className='bg-red-500 h-0'>
          </div>
      </div>
    </div>
  )
}

export default Home
