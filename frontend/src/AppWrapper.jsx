import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import App from './App'; // Adjust if necessary

const libraries = ['places', 'geometry', 'marker'];  // add any other libraries if needed

const AppWrapper = () => {
    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={libraries}
        >
            <App />
        </LoadScript>
    );
};

export default AppWrapper;
