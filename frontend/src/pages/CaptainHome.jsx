import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import axios from 'axios';

import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import MapDirectionTracker from '../components/MapDirectionTracker';

import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

import rideon from '../assets/ride-on.png';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!captain?._id) return;

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain',
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            socket.emit('update-location-captain', {
              captainId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          },
          (error) => {
            console.error('Location Error:', error);
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 5000,
          }
        );
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [captain]);

  useEffect(() => {
    socket.on('new-ride', (data) => {
      console.log(data);
      setRide(data);
      setRidePopupPanel(true);
    });

    return () => {
      socket.off('new-ride');
    };
  }, [socket]);

  async function confirmRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (err) {
      console.error('Error confirming ride:', err);
    }
  }

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="min-h-screen flex flex-col relative bg-gray-100 overflow-hidden">

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 p-4 sm:p-6 flex items-center justify-between bg-white shadow-md">
        <img
          src={rideon}
          alt="Ride On"
          className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
        />
        <Link
          to="/home"
          className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-white flex items-center justify-center rounded-full shadow transition-all duration-300"
        >
          <i className="text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map */}
      <div className="flex-1 relative pt-20 sm:pt-24">
        <div className="absolute inset-0">
          <MapDirectionTracker
            pickup={ride?.pickup}
            destination={ride?.destination}
          />
        </div>
      </div>

      {/* Captain Details */}
      <div className="bg-white border-t shadow-lg z-10">
        <div className="p-4 sm:p-6 max-h-48 sm:max-h-64 overflow-y-auto">
          <CaptainDetails />
        </div>
      </div>

      {/* Ride Pop-Up Panel */}
      <div
        ref={ridePopupPanelRef}
        className="fixed inset-x-0 bottom-0 z-30 translate-y-full bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out"
      >
        <div className="max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:mb-6"></div>
            <RidePopUp
              setRidePopupPanel={setRidePopupPanel}
              setConfirmRidePopupPanel={setConfirmRidePopupPanel}
              ride={ride}
              confirmRide={confirmRide}
            />
          </div>
        </div>
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed inset-0 z-40 translate-y-full bg-white transition-transform duration-300 ease-in-out"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 sm:p-6 border-b">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <ConfirmRidePopUp
                ride={ride}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                setRidePopupPanel={setRidePopupPanel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
