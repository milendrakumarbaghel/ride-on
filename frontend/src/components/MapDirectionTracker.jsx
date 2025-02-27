import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadScript, GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const LIBRARIES = ['places']; // Ensuring correct library use
const mapContainerStyle = { width: '100%', height: '100%' };
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapDirectionTracker = ({ pickup, destination }) => {
    const location = useLocation();
    const path = location.pathname;

    const isHomePage = ['/', '/home', '/captain-home'].includes(path);
    const isRidingPage = ['/riding', '/captain-riding'].includes(path);

    return (
        <LoadScript googleMapsApiKey={API_KEY} libraries={LIBRARIES}>
            <div className="map-direction-tracker" style={{ width: '100%', height: '100%' }}>
                {isHomePage && <LiveTrackingContent />}
                {isRidingPage && <PickupDestinationContent pickup={pickup} destination={destination} />}
            </div>
        </LoadScript>
    );
};

// 🚀 Live Tracking Component
const LiveTrackingContent = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                (error) => console.error('Error getting location:', error),
                { enableHighAccuracy: true, maximumAge: 0, timeout: 8000 }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error('Geolocation not supported');
        }
    }, []);

    useEffect(() => {
        if (mapRef.current && currentPosition) {
            if (!markerRef.current) {
                markerRef.current = new window.google.maps.Marker({
                    position: currentPosition,
                    map: mapRef.current,
                });
            } else {
                markerRef.current.setPosition(currentPosition);
            }
        }
    }, [currentPosition]);

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={currentPosition || { lat: 0, lng: 0 }}
            zoom={currentPosition ? 18 : 2}
            onLoad={(map) => (mapRef.current = map)}
            options={{ mapId: MAP_ID }}
        />
    );
};

// 🚗 Pickup & Destination Direction Component
const PickupDestinationContent = ({ pickup, destination }) => {
    const [directionsResponse, setDirectionsResponse] = useState(null);

    useEffect(() => {
        setDirectionsResponse(null); // Reset directions when new locations are set
    }, [pickup, destination]);

    if (!pickup || !destination) {
        return <div className='p-4 text-red-600'>Pickup or destination missing</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={pickup}
            zoom={14}
            options={{ mapId: MAP_ID }}
        >
            {!directionsResponse && (
                <DirectionsService
                    options={{ origin: pickup, destination: destination, travelMode: 'DRIVING' }}
                    callback={(result, status) => {
                        if (status === 'OK') {
                            setDirectionsResponse(result);
                        } else {
                            console.error('Directions request failed:', status);
                        }
                    }}
                />
            )}
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
    );
};

PickupDestinationContent.propTypes = {
    pickup: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    destination: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default MapDirectionTracker;
