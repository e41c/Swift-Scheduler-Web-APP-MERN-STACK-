import React from 'react'

function AdminStudent() {
  return (
    <div className='text-white flex flex-col items-center'>
        <div className='flex flex-col bg-black p-2 rounded-md md:w-1/2 items-center'>
            <h2>Register Student</h2>
            <form action="/api/" method="post" >
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName" id="firstName" placeholder=' John' required/><br />
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" name="lastName" id="lastName" placeholder=' Doe' required/><br/>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" id="email" placeholder=' example@gmail.com' required/><br/>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" placeholder=' at least 8 characters' /><br/>
                <button className='bg-indigo-600 p-1 rounded-md' type='submit'>Register</button>
            </form>
        </div>
        <br></br>
        <div>
            <h2>Delete Student</h2>

        </div>

      
    </div>
  )
}

export default AdminStudent
