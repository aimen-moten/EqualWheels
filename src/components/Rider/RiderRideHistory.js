import React from 'react'

const RiderRideHistory = () => {
  return (
    <div className='bg-gray-900'>
      <RiderHeader/>
      <div className='bg-gray-900 text-white p-24 flex items-center mx-auto justify-between'>
        <h1 className='text-4xl font-bold'>Your Ride History</h1>
        <Link to="/rider-request-form"><button className='bg-white p-4 text-gray-900 rounded-lg font-bold'>Request a New Ride</button></Link>
      </div>
      <div className='pb-24 px-24 flex flex-wrap gap-10 justify-center'>
      {data.map((details)=>{
        return <RideCard amount={details.amount} origin={details.origin} destination={details.destination} payment={details.payment}/>})}
        
      </div>
        
      
    </div>
  )
}

export default RiderPayments
