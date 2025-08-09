import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const LIBRARIES = ['places']; // Ensuring correct library use
const mapContainerStyle = { width: '100%', height: '100%' };
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapDirectionTracker = ({ pickup, destination }) => {
    const location = useLocation();
    const path = location.pathname;
    const isHomePage = useMemo(() => ['/', '/home', '/captain-home'].includes(path), [path]);
    const isRidingPage = useMemo(() => ['/riding', '/captain-riding'].includes(path), [path]);

    // Load Google Maps script once using hook to avoid repeated LoadScript remount warnings
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-maps-script',
        googleMapsApiKey: API_KEY,
        libraries: LIBRARIES
    });

    if (loadError) {
        return <div className='text-red-600 p-2 text-sm'>Map load error.</div>;
    }
    if (!isLoaded) {
        return <div className='w-full h-full flex items-center justify-center text-gray-500 text-sm animate-pulse'>Loading map...</div>;
    }

    return (
        <div className="map-direction-tracker" style={{ width: '100%', height: '100%' }}>
            {isHomePage && <LiveTrackingContent />}
            {isRidingPage && <PickupDestinationContent pickup={pickup} destination={destination} />}
        </div>
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
// Simple in-memory geocode cache to avoid repeated network + texture uploads
const _geocodeCache = {};
const geocodeAddress = (address) => new Promise((resolve, reject) => {
    if (_geocodeCache[address]) return resolve(_geocodeCache[address]);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
            const loc = results[0].geometry.location;
            const data = { lat: loc.lat(), lng: loc.lng() };
            _geocodeCache[address] = data; // cache
            resolve(data);
        } else {
            reject(new Error(status));
        }
    });
});

const PickupDestinationContent = ({ pickup, destination }) => {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [coords, setCoords] = useState({ pickup: null, destination: null });
    const [statusMsg, setStatusMsg] = useState('Geocoding...');
    const [error, setError] = useState(null);

    // Resolve any string addresses once. Objects with lat/lng pass through.
    useEffect(() => {
        let cancelled = false;
        setDirectionsResponse(null);
        setError(null);
        if (!pickup || !destination) return;
        (async () => {
            try {
                const resolvedPickup = typeof pickup === 'string' ? await geocodeAddress(pickup) : pickup;
                const resolvedDest = typeof destination === 'string' ? await geocodeAddress(destination) : destination;
                if (!cancelled) {
                    setCoords({ pickup: resolvedPickup, destination: resolvedDest });
                    setStatusMsg('Ready');
                }
            } catch (e) {
                if (!cancelled) setError('Geocode failed: ' + e.message);
            }
        })();
        return () => { cancelled = true; };
    }, [pickup, destination]);

    if (!pickup || !destination) return <div className='p-2 text-xs text-red-600'>Pickup or destination missing</div>;
    if (error) return <div className='p-2 text-xs text-red-600'>{error}</div>;
    if (!coords.pickup || !coords.destination) return <div className='w-full h-full flex items-center justify-center text-gray-500 text-xs'>{statusMsg}</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={coords.pickup}
            zoom={14}
            options={{ mapId: MAP_ID, clickableIcons: false, streetViewControl: false, fullscreenControl: false }}
        >
            {!directionsResponse && (
                <DirectionsService
                    options={{ origin: coords.pickup, destination: coords.destination, travelMode: 'DRIVING' }}
                    callback={(result, status) => {
                        if (status === 'OK') {
                            setDirectionsResponse(result);
                        } else if (!['NOT_FOUND', 'ZERO_RESULTS'].includes(status)) {
                            console.warn('Directions status:', status);
                        }
                    }}
                />
            )}
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} options={{ suppressMarkers: false }} />}
        </GoogleMap>
    );
};

PickupDestinationContent.propTypes = {
    pickup: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    destination: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default MapDirectionTracker;
