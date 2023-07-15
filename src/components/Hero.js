import React from 'react'

const Hero = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
    <div className="p-6 border border-gray-800 rounded-lg max-w-sm">
      <h1 className="text-4xl font-bold text-white text-center mb-6">Welcome to Equal Wheels</h1>
      <p className="text-gray-400 text-center mb-8">Your Trusted Ride-Sharing Platform</p>
      <div className="flex justify-center space-x-4">
        <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Login as Rider</button>
        <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">Login as Driver</button>
      </div>
    </div>
  </div>
  )
}

export default Hero