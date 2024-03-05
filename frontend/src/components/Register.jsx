import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Register() {

  const location = useLocation();
  const role = location.state?.role;
  const { setUserAuthInfo } = useAuth();

  const getInitialFormState = () => {
    const initialState = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneN: '',
    };
    if (role === 'staff') {
      initialState.bio = ''; // Add bio field for staff
    }
    return initialState;
  };

  const [form, setForm] = useState(getInitialFormState());
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If the field being updated is bio and the user is staff, update bio field
    if (name === 'bio' && role === 'staff') {
      setForm(prevForm => ({
        ...prevForm,
        bio: value
      }));
    } else {
      // For other fields or if the user is not staff, update other fields
      setForm(prevForm => ({
        ...prevForm,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };
  
  const onRegister = async (e) => {
    e.preventDefault();
    const registerUrl = role === 'student' ? '/auth/register/student' : '/auth/register/teacher';
    try{
      if(form.firstName === '' || form.lastName === '' || form.email === '' || form.password === '' || form.phoneN === ''){
        alert('Please fill in all fields');
        return;
      }
      await axios.post(registerUrl, form)
        .then(res => {
        console.log(res);
        setUserAuthInfo({ token: res.data.token });
      })
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='mt-24 h-[calc(100vh-4rem)] overflow-auto"'>
      {role === 'student' ? <h1 className='className="text-12xl text-white font-bold mb-2 uppercase text-center'>Student Registration</h1> : <h1 className='className="text-12xl text-white font-bold mb-2 uppercase text-center'>Staff Registration</h1>}
      <form
        onSubmit={onRegister}
        className="w-full max-w-lg mx-auto mt-8 bg-[#1d1d1d] shadow-md rounded px-8 pt-6 pb-8"
      >
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="phoneN"
            value={form.phoneN}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
        </div>
        {role === 'staff' && (
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Bio
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="bio"
              value={form.bio}
              onChange={handleInputChange}
              placeholder="Bio"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
    </div>
  )
}
