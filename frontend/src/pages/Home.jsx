  import React, { useState, useEffect, useRef, useContext } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useGSAP } from '@gsap/react';
  import gsap from 'gsap';
  import axios from 'axios';

  import LocationSearchPanel from '../components/LocationSearchPanel';
  import VehiclePanel from '../components/VehiclePanel';
  import ConfirmRide from '../components/ConfirmRide';
  import LookingForDriver from '../components/LookingForDriver';
  import WaitingForDriver from '../components/WaitingForDriver';
  import MapDirectionTracker from '../components/MapDirectionTracker';

  import { SocketContext } from '../context/SocketContext';
  import { UserDataContext } from '../context/UserContext';

  import rideon from "../assets/ride-on.png";
  import 'remixicon/fonts/remixicon.css';

  const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [ride, setRide] = useState(null);
    const [vehicleType, setVehicleType] = useState(null);
    const [isRideStarted, setIsRideStarted] = useState(false);

    const navigate = useNavigate();

    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);

    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    useEffect(() => {
      if (!user?._id) return;
      socket.emit("join", { userType: "user", userId: user._id });
    }, [user]);

    useEffect(() => {
      socket.on('ride-confirmed', (ride) => {
        setVehicleFound(false);
        setWaitingForDriver(true);
        setRide(ride);
      });

      socket.on('ride-started', (ride) => {
        setWaitingForDriver(false);
        setRide(ride);
        setIsRideStarted(true);
      });

      return () => {
        socket.off('ride-confirmed');
        socket.off('ride-started');
      };
    }, []);

    useEffect(() => {
      if (isRideStarted && ride) {
        navigate('/riding', {
          replace: true,
          state: { ride }
        });
      }
    }, [isRideStarted, ride]);

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

    const handlePickupChange = async (e) => {
      setPickup(e.target.value);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPickupSuggestions(response.data);
      } catch {}
    };

    const handleDestinationChange = async (e) => {
      setDestination(e.target.value);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setDestinationSuggestions(response.data);
      } catch {}
    };

    const findTrip = async () => {
      setVehiclePanel(true);
      setPanelOpen(false);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
          params: { pickup, destination },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFare(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const createRide = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`, {
          pickup,
          destination,
          vehicleType
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRide(response.data);
        setVehiclePanel(false);
      } catch (error) {
        console.error(error);
      }
    };

    useGSAP(() => {
      gsap.to(panelRef.current, {
        height: panelOpen ? '70%' : '0%',
        padding: panelOpen ? 24 : 0,
        display: panelOpen ? 'block' : 'none'
      });
      gsap.to(panelCloseRef.current, {
        opacity: panelOpen ? 1 : 0
      });
    }, [panelOpen]);

    useGSAP(() => {
      gsap.to(vehiclePanelRef.current, {
        transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)',
        display: vehiclePanel ? 'block' : 'none'
      });
    }, [vehiclePanel]);

    useGSAP(() => {
      gsap.to(confirmRidePanelRef.current, {
        transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
        display: confirmRidePanel ? 'block' : 'none'
      });
    }, [confirmRidePanel]);

    useGSAP(() => {
      gsap.to(vehicleFoundRef.current, {
        transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
        display: vehicleFound ? 'block' : 'none'
      });
    }, [vehicleFound]);

    useGSAP(() => {
      gsap.to(waitingForDriverRef.current, {
        transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)',
        display: waitingForDriver ? 'block' : 'none'
      });
    }, [waitingForDriver]);

    return (
      <div className="min-h-screen flex flex-col relative bg-gray-100 overflow-hidden">

        {/* Header - Consistent with CaptainHome */}
        <div className="fixed top-0 left-0 right-0 z-20 p-4 sm:p-6 flex items-center justify-between bg-white shadow-md">
          <img
            src={rideon}
            alt="Ride On"
            className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
          />
          <button
            onClick={handleLogout}
            className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-red-50 hover:text-red-500 flex items-center justify-center rounded-full shadow transition-all duration-300 group"
            title="Logout"
          >
            <i className="text-lg ri-logout-box-r-line group-hover:scale-110 transition-transform"></i>
          </button>
        </div>

        {/* Map */}
        <div className="flex-1 relative pt-20 sm:pt-24">
          <div className="absolute inset-0">
            <MapDirectionTracker pickup={ride?.pickup} destination={ride?.destination} />
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="absolute bottom-0 w-full flex flex-col justify-end z-10">
          <div className="bg-white rounded-t-3xl px-4 sm:px-6 py-6 sm:py-8 shadow-lg relative">
            <h5
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className="absolute top-4 right-4 text-2xl opacity-0 transition-opacity duration-300 cursor-pointer hover:text-gray-600"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>

            <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Find a trip</h4>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <div className="relative">
                <i className="ri-map-pin-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                <input
                  onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
                  value={pickup}
                  onChange={handlePickupChange}
                  className="bg-gray-100 hover:bg-gray-200 focus:bg-white pl-10 pr-4 py-3 text-base sm:text-lg rounded-lg w-full border-2 border-transparent focus:border-blue-500 transition-all duration-200 outline-none"
                  type="text"
                  placeholder="Enter pickup location"
                />
              </div>

              <div className="relative">
                <i className="ri-map-pin-2-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                <input
                  onClick={() => { setPanelOpen(true); setActiveField('destination'); }}
                  value={destination}
                  onChange={handleDestinationChange}
                  className="bg-gray-100 hover:bg-gray-200 focus:bg-white pl-10 pr-4 py-3 text-base sm:text-lg rounded-lg w-full border-2 border-transparent focus:border-blue-500 transition-all duration-200 outline-none"
                  type="text"
                  placeholder="Enter dropoff location"
                />
              </div>

              <button
                onClick={findTrip}
                disabled={!pickup || !destination}
                className="bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-base sm:text-lg px-4 py-3 rounded-lg w-full mt-4 transition-all duration-200 font-medium"
              >
                Find Trip
              </button>
            </form>
          </div>

          {/* Location Suggestions Panel */}
          <div ref={panelRef} className="bg-white overflow-y-auto h-0 transition-all duration-300 shadow-lg">
            <LocationSearchPanel
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>

        {/* Sliding Panels */}
        <div ref={vehiclePanelRef} className="fixed bottom-0 w-full z-30 translate-y-full bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out">
          <div className="max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:mb-6"></div>
              <VehiclePanel
                selectVehicle={setVehicleType}
                fare={fare}
                setConfirmRidePanel={setConfirmRidePanel}
                setVehiclePanel={setVehiclePanel}
              />
            </div>
          </div>
        </div>

        <div ref={confirmRidePanelRef} className="fixed bottom-0 w-full z-30 translate-y-full bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out">
          <div className="max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:mb-6"></div>
              <ConfirmRide
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                fare={fare}
                vehicleType={vehicleType}
                setConfirmRidePanel={setConfirmRidePanel}
                setVehicleFound={setVehicleFound}
              />
            </div>
          </div>
        </div>

        <div ref={vehicleFoundRef} className="fixed bottom-0 w-full z-30 translate-y-full bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out">
          <div className="max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:mb-6"></div>
              <LookingForDriver
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                fare={fare}
                vehicleType={vehicleType}
                setVehicleFound={setVehicleFound}
              />
            </div>
          </div>
        </div>

        <div ref={waitingForDriverRef} className="fixed bottom-0 w-full z-30 translate-y-full bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out">
          <div className="max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:mb-6"></div>
              <WaitingForDriver
                ride={ride}
                setVehicleFound={setVehicleFound}
                setWaitingForDriver={setWaitingForDriver}
                waitingForDriver={waitingForDriver}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Home;
