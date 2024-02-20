import { useState } from 'react';
import axios from 'axios';
export default function Register() {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneN: ''
  });
  const handleInputChange = (e) => {
    const {name, value, type, checked} = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));

  }
  const onRegister = async (e) => {
    e.preventDefault();
    try{
      if(form.firstName === '' || form.lastName === '' || form.email === '' || form.password === '' || form.phoneN === ''){
        alert('Please fill in all fields');
        return;
      }
      await axios.post('/auth/register/student', form)
        .then(res => {
        console.log(res);
      })
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='mt-24 h-[calc(100vh-4rem)] overflow-auto"'>
      <form onSubmit={onRegister}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneN"
            value={form.phoneN}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>

    </div>
  )
}
