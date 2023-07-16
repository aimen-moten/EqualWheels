import React from 'react'
import { Link } from 'react-router-dom'
import RiderHeader from './RiderHeader'
import { useState } from 'react'

const data = [
  {amount: "50", origin: "Home", destination:"KU", payment:"Card ending in 8765"},
  {amount: "25", origin: "Office", destination: "Park", payment: "Card ending in 1234"},
{amount: "100", origin: "Store", destination: "Beach", payment: "Card ending in 5678"},
{amount: "75", origin: "Restaurant", destination: "Museum", payment: "Card ending in 9012"},
{amount: "30", origin: "Gym", destination: "Library", payment: "Card ending in 3456"},
{amount: "60", origin: "Airport", destination: "Hotel", payment: "Card ending in 7890"},
{amount: "40", origin: "School", destination: "Zoo", payment: "Card ending in 2345"},
{amount: "80", origin: "Cinema", destination: "Shopping Mall", payment: "Card ending in 6789"},
// {amount: "50", origin: "Coffee Shop", destination: "Park", payment: "Card ending in 0123"},
// {amount: "20", origin: "Friend's House", destination: "Work", payment: "Card ending in 4567"},
// {amount: "90", origin: "Hospital", destination: "Restaurant", payment: "Card ending in 8901"},
// {amount: "50", origin: "Home", destination:"KU", payment:"Card ending in 8765"},
]

const PaymentCard = (props) =>{
 
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white text-gray-900 p-12 w-[20%] text-center rounded-md ${
        isHovered ? 'hover:bg-gray-700' : ''
        }`
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
        <p className='text-5xl font-bold m-2'>${props.amount}</p>
        <p className='text-md m-2'><b>{props.origin}</b> to <b>{props.destination}</b></p>
        <p className='text-md m-2'>Paid using<b> {props.payment}</b></p>
      {isHovered && (
        <a href='/' className='text-white'>View Details</a>
      )}
    </div>
  )
}

const RiderPayments = () => {
  return (
    <div className='bg-gray-900'>
      <RiderHeader/>
      <div className='bg-gray-900 text-white p-24 flex items-center mx-auto justify-between'>
        <h1 className='text-4xl font-bold'>Your Payment History</h1>
        <Link to="https://buy.stripe.com/test_cN27vj9p7bIG3DO5kk"><button className='bg-white p-4 text-gray-900 rounded-lg font-bold'>Make a new Payment</button></Link>
      </div>
      <div className='pb-24 px-24 flex flex-wrap gap-10 justify-center'>
      {data.map((details)=>{
        return <PaymentCard amount={details.amount} origin={details.origin} destination={details.destination} payment={details.payment} />})}
        
      </div>
        
      
    </div>
  )
}

export default RiderPayments