import React from 'react'


function AdminWidget(props) {
  return (
    <div className='size-60 flex flex-col text-white text-2xl '>
      <h3 className='text-xl place-self-center'>{props.title}</h3>
      <div className='size-1/2 bg-indigo-600 rounded-lg place-self-center grid '>
      <h3 className='place-self-center'>{props.total}</h3>
      </div>
      <h3 className='place-self-center text-lg '>Delete/Register </h3>


    </div>
  )
}

export default AdminWidget
