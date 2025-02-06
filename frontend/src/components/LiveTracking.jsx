import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

// ✅ Keep libraries as a static constant to avoid reloading issues
const LIBRARIES = ['marker']; // Required for AdvancedMarkerElement

const mapContainerStyle = { width: '100%', height: '100%' };

// ✅ Add a valid Google Maps Map ID
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID; // Ensure it's set in your environment variables

const LiveTracking = () => {
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
                { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error('Geolocation not supported');
        }
    }, []);

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         const intervalId = setInterval(() => {
    //             navigator.geolocation.getCurrentPosition(
    //                 (position) => {
    //                     const { latitude, longitude } = position.coords;
    //                     setCurrentPosition({ lat: latitude, lng: longitude });
    //                 },
    //                 (error) => console.error('Error getting location:', error),
    //                 { enableHighAccuracy: true }
    //             );
    //         }, 5000); // Updates every 5 seconds

    //         return () => clearInterval(intervalId);
    //     } else {
    //         console.error('Geolocation not supported');
    //     }
    // }, []);

    const handleMapLoad = (map) => {
        mapRef.current = map;
        console.log('Google Map Loaded:', map);
    };

    useEffect(() => {
        if (mapRef.current && window.google?.maps?.marker?.AdvancedMarkerElement && currentPosition) {
            if (!markerRef.current) {
                // ✅ Create marker only once
                markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
                    position: currentPosition,
                    map: mapRef.current,
                });
                console.log('Marker created:', markerRef.current);
            } else {
                // ✅ Update marker position dynamically
                markerRef.current.position = currentPosition;
                console.log('Marker position updated:', markerRef.current.position);
            }
        }
    }, [currentPosition]);

    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={LIBRARIES} // ✅ Static variable to prevent unnecessary reloads
            onLoad={() => console.log('Google Maps API Loaded!')}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={currentPosition || { lat: 0, lng: 0 }}
                zoom={currentPosition ? 18 : 2}
                onLoad={handleMapLoad}
                options={{
                    mapId: MAP_ID, // Keep your Map ID
                }}
            />
        </LoadScript>
    );
};

export default LiveTracking;
