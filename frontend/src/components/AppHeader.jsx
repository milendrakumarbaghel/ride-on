import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import rideon from '../assets/ride-on.png';

/**
 * Shared application header with RideOn logo and a logout button.
 * Decides whether to navigate to user or captain auth route based on current pathname context.
 */
const AppHeader = ({ className = '' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isCaptain = location.pathname.startsWith('/captain');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate(isCaptain ? '/captain-login' : '/login');
    };

    return (
        <div className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-soft ${className}`}>
            <div className="flex items-center gap-2 select-none">
                <img src={rideon} alt='Ride On' className='h-10 w-auto sm:h-12 drop-shadow' />
            </div>
            <button
                onClick={handleLogout}
                className='group relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors shadow-inner'
                aria-label='Logout'
                title='Logout'
            >
                <i className='ri-logout-box-r-line text-xl transition-transform group-hover:scale-110'></i>
                <span className='sr-only'>Logout</span>
            </button>
        </div>
    );
};

export default AppHeader;
