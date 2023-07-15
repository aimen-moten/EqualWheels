import React from 'react'
import RiderHeader from './RiderHeader'
import RideRequestForm from './RideRequestForm'

function RideRequestPage() {
  return (
    <div className='bg-gray-900'>
        <RiderHeader />
        <div className='font-bold text-white text-center justify-center items-center p-8'>
          <h1 className='text-6xl'>Request a Ride</h1>
          <p className='text-3xl'>Safe and Affordable, Only for You!</p>
        </div>
        <div>
            <RideRequestForm />
        </div>
        
    </div>
  )
}

export default RideRequestPage