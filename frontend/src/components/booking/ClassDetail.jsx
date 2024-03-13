//import React from 'react'
import { useAuth } from "../../AuthContext"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
export default function ClassDetail() {
    const { auth } = useAuth()
    const location = useLocation()
    const role = auth.role
    const classInfo = location.state?.classInfo
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')

    const dateFromISO = new Date(classInfo.date);
    const timeParts = classInfo.time.match(/(\d+):(\d+)/);

    if (timeParts) {
    
      dateFromISO.setHours(parseInt(timeParts[1]), parseInt(timeParts[2]));
    }

    const formattedDate = dateFromISO.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = dateFromISO.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const handleJoinClass = async() => {
      setLoading(true);
      setStatus('');
      try {
        const response = await axios.post(`/api/classes/join/${classInfo._id}`, {}, {
          headers: { Authorization: `Bearer ${auth.token}` }
        });

        // Set success message
        setStatus('Enrolled successfully');
      } catch (err) {
        if (err.response && err.response.status === 400) { 
          console.log(err.response.data);
          setStatus('Already enrolled');
        } else {
          setStatus('Failed to enroll');
        }
      } finally {
        setLoading(false);
      }
    }
    const cancelClass = () => {}
    if (loading) {
      return <div>Loading...</div>
    }
    

  return (
    <div className="class-detail-container mt-20 mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            {classInfo.studentLevel}, {classInfo.danceCategory}
        </h1>
        <h2 className="text-xl text-center text-gray-700 mb-4">
            {formattedDate}, {formattedTime}
        </h2>
        <p>Rating: {classInfo.rating}</p>
        <p>Teacher: {classInfo.teacher}</p>
        <p>Room: {classInfo.classroom}</p>

        {status && <p>{status}</p>} 
        {role === 'student' ? 
        <div className="flex justify-between space-x-4 mt-4">
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            onClick={handleJoinClass}
          >
            Join 
          </button>
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            onClick={cancelClass}
          >
            Cancel
          </button>
        </div>
      
          
        
          : null}
             
            </div>
  )
}
