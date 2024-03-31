/* eslint-disable no-unused-vars */
//import React from 'react'
import { useAuth } from "../../AuthContext"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
import moment from "moment"
import { useClassContext } from "../../ClassContext"

export default function ClassDetail() {
    const { auth } = useAuth()
    const location = useLocation()
    const role = auth.role
    const classInfo = location.state?.classInfo
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')

    const {formatDate, formatDateTime } = useClassContext()
    const momentDateTime = moment(formatDateTime(classInfo.date, classInfo.time))
    const formattedDateTime = momentDateTime.format('dddd, MMMM D, YYYY') + ' at ' + `${classInfo.time}`;
    
    const calculateAvailableSpots = (cls) => {return classInfo.capacity - classInfo.studentsEnrolled.length};

    // const dateFromISO = new Date(classInfo.date);
    // const timeParts = classInfo.time.match(/(\d+):(\d+)/);
  
    // if (timeParts) {
    
    //   dateFromISO.setHours(parseInt(timeParts[1]), parseInt(timeParts[2]));
    // }

    // const formattedDate = dateFromISO.toLocaleDateString('en-US', {
    //   weekday: 'long',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric'
    // });
    // const formattedTime = dateFromISO.toLocaleTimeString('en-US', {
    //   hour: 'numeric',
    //   minute: '2-digit',
    //   hour12: true
    // });

    const handleJoinClass = async() => {
      setLoading(true);
      setStatus('');
      try {
        const response = await axios.post(`/api/classes/join/${classInfo._id}`, {}, {
          headers: { Authorization: `Bearer ${auth.token}` }
        });

        
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
    const cancelClass = () => {
      setLoading(true);
      setStatus('');
      axios.post(`/api/classes/remove/${classInfo._id}`, {}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      }).then(() => {
        setStatus('Class Cancelled Successfully');
      }).catch((err) => {
        if (err.response && err.response.status === 403) {
          setStatus('Class Already Cancelled');
        }
        console.error(err);
      }).finally(() => {
        setLoading(false);
      });
    }
    if (loading) {
      return <div>Loading...</div>
    }
    

  return (
    <div className="class-detail-container mt-20 mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            {classInfo.studentLevel}, {classInfo.danceCategory}
        </h1>
        <h2 className="text-xl text-center text-gray-700 mb-4">
            {formattedDateTime}
        </h2>
        { classInfo.rating &&
          <p>Rating: {classInfo.rating}</p>}

        <p>Teacher: {classInfo.teacher.firstName} {classInfo.teacher.lastName}</p>
        {classInfo.classroom && <p>Room: {classInfo.classroom.classroomNumber}</p>}

        

        {status && <p>{status}</p>} 
        {role === 'student' && calculateAvailableSpots(classInfo) > 0? 
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
          {
            calculateAvailableSpots(classInfo) === 0 ? <p>Class is full</p> : null
          }
             
            </div>
  )
}

// import React, { useEffect, useState } from 'react';
// import { useAuth } from "../../AuthContext";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from 'axios';

// export default function ClassDetail() {
//     const { auth } = useAuth();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const classInfo = location.state?.classInfo;
//     const [loading, setLoading] = useState(false);
//     const [status, setStatus] = useState('');
//     const [formattedDate, setFormattedDate] = useState('');
//     const [formattedTime, setFormattedTime] = useState('');

//     useEffect(() => {
//         if (classInfo) {
//             const date = new Date(classInfo.date);
//             const timeParts = classInfo.time.match(/(\d+):(\d+)/);
//             if (timeParts) {
//                 date.setHours(parseInt(timeParts[1]), parseInt(timeParts[2]), 0);
//             }

//             setFormattedDate(date.toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             }));
//             setFormattedTime(date.toLocaleTimeString('en-US', {
//                 hour: 'numeric',
//                 minute: '2-digit',
//                 hour12: true
//             }));
//         }
//     }, [classInfo]);

//     const handleJoinClass = async () => {
//       setLoading(true);
//       setStatus('');
//       try {
//           const response = await axios.post(`/api/classes/join/${classInfo._id}`, {}, {
//               headers: { Authorization: `Bearer ${auth.token}` }
//           });
//           setStatus(response.data.message);
//           // Reload or navigate to refresh the class details
//           navigate(`/class/${classInfo._id}`);
//       } catch (err) {
//           const errorMessage = err.response?.data?.message || 'Failed to enroll';
//           setStatus(errorMessage);
//       } finally {
//           setLoading(false);
//       }
//     };

//     const cancelClass = async () => {
//       setLoading(true);
//       setStatus('');
//       try {
//           const response = await axios.post(`/api/classes/remove/${classInfo._id}`, {}, {
//               headers: { Authorization: `Bearer ${auth.token}` }
//           });
//           setStatus(response.data.message);
//           // Reload or navigate to refresh the class details
//           navigate(`/class/${classInfo._id}`);
//       } catch (err) {
//           const errorMessage = err.response?.data?.message || 'Failed to cancel';
//           setStatus(errorMessage);
//       } finally {
//           setLoading(false);
//       }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="class-detail-container mt-20 mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg">
//             <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
//                 {classInfo?.studentLevel}, {classInfo?.danceCategory}
//             </h1>
//             <h2 className="text-xl text-center text-gray-700 mb-4">
//                 {formattedDate}, {formattedTime}
//             </h2>
//             <p>Teacher: {classInfo?.teacher.firstName} {classInfo?.teacher.lastName}</p>
//             <p>Room: {classInfo?.classroom}</p>
//             <p>{classInfo?.capacity - classInfo?.studentsEnrolled.length} spots available</p>

//             {status && <p className="text-red-500">{status}</p>}
//             {auth.role === 'student' && 
//                 <div className="flex justify-center space-x-4 mt-4">
//                     <button 
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                         onClick={handleJoinClass}
//                         disabled={loading}
//                     >
//                         Join Class
//                     </button>
//                     <button 
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                         onClick={cancelClass}
//                         disabled={loading}
//                     >
//                         Cancel Class
//                     </button>
//                 </div>
//             }
//         </div>
//     );
// }
