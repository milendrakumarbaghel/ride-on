import React from 'react'
import rideon from "../assets/ride-on.png";

const Start = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/70 to-indigo-900/80 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-pulse"
        style={{
          backgroundImage: "url('https://plus.unsplash.com/premium_photo-1736517545267-92346c5fc0a8?q=80&w=2727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          animationDuration: '8s'
        }}
      ></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl animate-pulse" style={{animationDuration: '4s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-30 flex flex-col justify-between min-h-screen">
        {/* Header */}
          <div className="pt-8 px-8">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center drop-shadow-2xl transform group-hover:scale-110 transition-all duration-300">
            <img src={rideon} alt="Ride-On Logo" className="w-12 h-12 object-contain" />
                </div>
              </div>
              <div className="text-white/90 font-bold text-xl tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300">
                Ride-On
              </div>
            </div>
          </div>

          {/* Bottom section */}
        <div className="relative">
          {/* Glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/90 to-transparent backdrop-blur-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 to-transparent"></div>

          <div className="relative px-6 pb-8 pt-12">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>

            <div className="max-w-md mx-auto text-center space-y-6">
              {/* Title with gradient text */}
              <div className="space-y-2">
                <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent leading-tight">
                  Get Started with
                </h1>
                <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Ride-On
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-gray-600 text-lg font-medium leading-relaxed">
                Your journey begins here. Experience seamless rides at your fingertips.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={() => console.log('Navigate to login')}
                  className='group relative w-full inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 active:scale-95'
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>

                 { /* Button content */}
                  <span
                    className="relative flex items-center space-x-2 cursor-pointer"
                    onClick={() => {
                      window.location.href = '/login';
                    }}
                  >
                    <span>Continue</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5-5 5M6 12h12"
                      />
                    </svg>
                  </span>

                  {/* Shine effect */}
                  <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>

              {/* Additional features hint */}
              <div className="flex items-center justify-center space-x-6 pt-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Fast</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <span>Reliable</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-1/4 left-8 w-2 h-2 bg-white/40 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 right-12 w-1 h-1 bg-blue-400/60 rounded-full animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-ping" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping" style={{animationDuration: '6s', animationDelay: '3s'}}></div>
      </div>
    </div>
  )
}

export default Start
