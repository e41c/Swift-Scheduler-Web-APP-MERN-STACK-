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
      {role === 'student' ? <h3 className='text-4xl text-center'>Student Registration</h3> : <h3 className='text-4xl text-center'>Staff Registration</h3>}
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
        {role === 'staff' && (
          <div>
            <label>Bio</label>
            <input
              type="text"
              name="bio"
              value={form.bio}
              onChange={handleInputChange}
            />
          </div>
        
        )}
        <button type="submit">Register</button>
      </form>

    </div>
  )
}
