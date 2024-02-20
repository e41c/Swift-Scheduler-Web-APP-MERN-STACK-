import { React, useState } from 'react'
import './Register.css'
import axios from 'axios'

function Register() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [bio, setBio] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/register", {firstName, lastName, email, password, phoneNumber, bio})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    return (
        <main class='main'>
            <section class="home section" id="home">
            <div class='home__data'>
                <h1 class="home__title">Sign Up</h1>
                <div className='underline'></div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='inputs'>
                <div className='input'>
                    <input 
                        type='text'
                        placeholder='First Name'
                        autoComplete='off'
                        name='firstName'
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <input 
                        type='text'
                        placeholder='Last Name'
                        autoComplete='off'
                        name='lastName'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <input 
                        type='email'
                        placeholder='email'
                        autoComplete='off'
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <input 
                        type='password'
                        placeholder='Password'
                        autoComplete='off'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <input 
                        type='text'
                        placeholder='Phone'
                        autoComplete='off'
                        name='phoneNumber'
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <input 
                        type='text'
                        placeholder='Bio'
                        autoComplete='off'
                        name='bio'
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
            </div>
            <div className='submit'>
                <button type='submit' className='submit-btn'>Sign Up</button>
            </div>
            </form>
                <div className='submit'>
                    <a href='./login'>Login</a>
                </div>
            </section>
        </main>
    )
}

export default Register