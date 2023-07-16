import React from 'react'
import RiderHeader from './RiderHeader'

function Submitted() {
  return (
    <div>
        <RiderHeader/>
        <div className='bg-gray-900  text-center justify-center mx-auto items-center p-64 text-white font-bold'>
            <h1 className='text-7xl mb-4'>Your Request Has Been Submitted.</h1>
            <p className='text-3xl'>A rider will contact you shortly.</p>
        </div>
    </div>
  )
}

export default Submitted