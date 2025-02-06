import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useState } from 'react'
import { useRef } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import axios from 'axios';


import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../components/LiveTracking'



const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);



  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

          // console.log({
          //   userId: captain._id,
          //   location: {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude
          //   }
          // })

          socket.emit('update-location-captain', {
            captainId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    // return () => clearInterval(locationInterval);
  }, [ captain ])

  socket.on('new-ride', (data) => {
    console.log(data);
    setRide(data);
    setRidePopupPanel(true);
  })

  async function confirmRide() {

    // console.log(process.env.VITE_BASE_URL)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  return (
    <div className='h-screen'>

      <div className='fixed p-6 top-0  flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <Link to='/home' className='h10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <LiveTracking />
      </div>

      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white py-10 pt-12'>
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          ride={ride}
          confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 translate-y-full bottom-0 bg-white py-10 pt-12'>
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>

    </div>
  )
}

export default CaptainHome
