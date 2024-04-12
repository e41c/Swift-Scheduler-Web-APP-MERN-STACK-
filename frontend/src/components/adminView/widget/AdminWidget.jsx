import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminWidget(props) {
    const navigate = useNavigate()
    function  handleClick(){
        navigate(`${props.link}`)
    }
  return (
    <div onClick={handleClick} className='bg-black shadow-sm rounded py-2 px-3
    cursor-pointer hover:shadow-white
    sm:w-full sm:bg-indigo-600 sm:flex sm:flex-col sm:items-center
    md:size-40 md:flex md:flex-col md:justify-center md:items-center md:bg-black'>
        <div>
            {props.title}
        </div>
        <div className='md:flex md:bg-indigo-600 text-center md:size-1/2 md:rounded-md md:justify-center md:flex-col'>
            {props.count}
        </div>
      <h2>Register/Delete</h2>
    </div>
  )
}

export default AdminWidget
