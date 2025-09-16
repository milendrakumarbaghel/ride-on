import React from 'react'
import { Link } from "react-router-dom";
import UserLogin from './UserLogin';
import rideon from "../assets/ride-on.png";

const Start = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse delay-2000"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={rideon} alt='Ride On' className='h-10 w-auto drop-shadow-lg' />
            <span className="text-xl font-bold text-gray-900">Ride-On</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium hover:scale-105 transform duration-200">
              Sign In
            </Link>
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">Live & Ready 2</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Your Journey,
            <span className="text-blue-600 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Priority</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Experience seamless ride-booking with Ride-On. Professional drivers, real-time tracking, and reliable service at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to='/login' className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto group">
              Start Your Ride
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
            </Link>
            <Link to='/signup' className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 px-6 py-3 rounded-2xl font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto border border-gray-200 hover:border-gray-300">
              Create Account
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 px-6 pb-2">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-center border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <i className="ri-map-pin-2-line text-xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Location</h3>
              <p className="text-sm text-gray-600">AI-powered location detection for accurate pickup and drop-off</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-center border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <i className="ri-radar-line text-xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
              <p className="text-sm text-gray-600">Live updates on driver location and estimated arrival time</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-center border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <i className="ri-shield-check-line text-xl text-purple-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-sm text-gray-600">Verified drivers and secure payment options for peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Footer */}
      <footer className="relative z-10 px-6 py-1 border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p className="text-gray-500 text-xs">© 2024 Ride-On. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Start
