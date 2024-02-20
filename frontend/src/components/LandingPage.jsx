import background from '../assets/landingp.jpg'
import { Link } from 'react-router-dom'
export default function LandingPage() {
  return (
    <div className='min-h-screen bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url(${background})`}}>
      {/* <img src={background} alt="landing page" className="w-full h-screen object-cover" /> */}
      {/*register*/}
      <section className='flex justify-center items-center h-screen'>
        <div className='bg-white bg-opacity-50 p-10 rounded-lg'>
          <h1 className='text-4xl font-bold text-center'>Welcome to Groove Zone</h1>
          <p className='text-center text-lg'>See something you like? Register here.</p>
          <div className='flex justify-center mt-10'>
            {/* <button className='bg-primary text-white p-3 rounded-lg'>Register</button> */}
            <Link className='bg-primary text-white p-3 rounded-lg' to="/register">Register Now</Link>
          </div>
        </div>
      </section>
      
    </div>
  )
}
