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
import rideon from "../assets/ride-on.png";

import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import MapDirectionTracker from '../components/MapDirectionTracker'
import AppHeader from '../components/AppHeader'


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
  }, [captain])

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

      {/* Shared Header */}
      <AppHeader />

      {/* Map + Content offset for header height */}
      <div className='h-3/5 pt-20'>
        <MapDirectionTracker
          pickup={ride?.pickup}
          destination={ride?.destination}
        />
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
