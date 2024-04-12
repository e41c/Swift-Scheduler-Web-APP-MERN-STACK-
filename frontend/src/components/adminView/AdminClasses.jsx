import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminClasses() {
  const { setUserAuthInfo, auth } = useAuth();
  const navigate = useNavigate();

  // Initial form state
  const getInitialFormState = () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneN: '',
    isAdmin: false,
  });

  // State for form data
  const [form, setForm] = useState(getInitialFormState());
  const [classesID,setClassesID] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  //delete submission
  const onDelete = async (e) => {
    e.preventDefault();
    const deleteUrl = `/classes/${classesID}`;
    try {
      // Validation
      if(classesID === ''){
        alert("ID input required")
        return;
      }

      await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        }
      }).then(res => {
        alert("Class deleted")
        console.log("deleted: ",res)
        navigate(-1);
      })

    }catch(error) {
      console.log("error",error);
    }

  }
  // Handle form submission
  const onRegister = async (e) => {
    e.preventDefault();
    const registerUrl = '/classes/';

    try {
      // Validation for empty fields
      if(form.firstName === '' || form.lastName === '' || form.email === '' || form.password === '' || form.phoneN === ''){
        alert('Please fill in all fields');
        return;
      }

      // Post request to register a Classes
      await axios.post(registerUrl, form)
        .then(res => {
          console.log(res);
          alert("Class Registered")
          navigate(-1)
        })
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className='mt-24 h-[calc(100vh-4rem)] overflow-auto'>
      <h1 className='text-12xl text-white font-bold mb-2 uppercase text-center'>Delete/Register Classes</h1>
      <form onSubmit={onRegister} className="w-full max-w-lg mx-auto mt-8 bg-[#1d1d1d] shadow-md rounded px-8 pt-6 pb-8">
        {/* First Name */}
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
        {/* Last Name */}
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
        {/* Email */}
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
        {/* Password */}
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
        {/* Phone Number */}
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
        {/* Submit Button */}
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>

      <div className="w-full max-w-lg mx-auto mt-8 bg-[#1d1d1d] shadow-md rounded px-8 pt-6 pb-8">

        <form onSubmit={onDelete} className="w-full max-w-lg mx-auto mt-8 bg-[#1d1d1d] shadow-md rounded px-8 pt-6 pb-8">
        <label className="block text-white text-sm font-bold mb-2">
            Classes ID:
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name='classesID'
            value={classesID}
            onChange={(e) => setClassesID(e.target.value)}></input>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
          Delete
        </button>
        </form>
      </div>
    </div>
  );
}
