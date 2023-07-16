import React, { useState } from 'react'
import RiderHeader from './RiderHeader'
import 'react-calendar/dist/Calendar.css';
// import Calendar from 'react-calendar';
// import TimePicker from 'react-time-picker';
// import 'react-clock/dist/Clock.css';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


import DateTimePicker from 'react-datetime-picker'
import { Link, Navigate } from 'react-router-dom';

const RideRequestForm = () => {
  const [formData, setFormData] = useState({
    origin:"", destination:"", forLater: false, date: new Date(), 
  })

  function handleChange(event){
    console.log(event)
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
     
      [name]: type === "checkbox" ? checked : value
    }))
  }

  function handleSubmit(event){
    event.preventDefault();
    
  }
  return (
    <div>
        
        <div className='bg-gray-900 justify-center gap-20 text-white mx-auto flex'>
        
        
        <form className='justify-center gap-20 text-gray-300'>
          <label htmlFor='origin' className='mb-2'>Origin</label>
          <br/>
        
          <input
            className='mb-4 border-solid border border-gray-500 rounded-lg h-8 w-64 p-2'
            type="text"
            name='origin'
            placeholder='Origin'
            value={formData.origin}
            onChange={handleChange}
            required
          />
          <br/>

          <label htmlFor='destination' className='mb-2'>Destination</label>
          <br/>
          <input
            className='mb-4 border-solid border border-gray-500 rounded-lg h-8 w-64 p-2'
            type="text"
            name='destination'
            placeholder='Destination'
            value={formData.destination}
            onChange={handleChange}
            required
          />
          <br/>
          <label>Schedule For Later?</label>
          <input
            className='my-4 ml-4 mr-2'
            type="checkbox"
            name='forLater'
            placeholder='Schedule For Later?'
            value={formData.forLater}
            onChange={handleChange}
        
          />
          {formData.forLater ? <DateTimePicker onChange={(event)=>{setFormData(prevFormData => ({...prevFormData, date: event}))}} value={formData.date} name='date' /> : null}
          <br/>
          <br/>
          <Link to="/submitted"><button className='p-2 bg-white text-gray-800 rounded-lg font-bold mb-8' onSubmit={handleSubmit} >Submit Request</button></Link>

          
        </form>
      </div>
    </div>
    
  )
}

export default RideRequestForm