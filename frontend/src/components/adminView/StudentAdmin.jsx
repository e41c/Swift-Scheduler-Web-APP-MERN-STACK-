import {useState} from 'react'

function StudentAdmin() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] =  useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  


  return (
    <div className='size-full flex flex-col items-center text-white '>
      <div className='m-2 p-4 rounded shadow-lg bg-black
      sm:size-1/2'>
        <h3>Register</h3>
        <form>
          <label htmlFor="firstName">First Name: </label>
          <input type="text" id="firstName" name="firstName" required /><br />

          <label htmlFor="lastName">Last Name: </label>
          <input type="text" id="lastName" name="lastName" required /><br />

          <label  htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" required /><br />

          <label htmlFor='password' >password</label>
          <input type='password' name='password'></input> <br/>

          <label htmlFor='phoneNumber'>Phone Number: </label>
          <input type='tel' name='phoneNumber' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required /><br />

          <button className='bg-indigo-600 rounded-md p-2' type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default StudentAdmin
