/* eslint-disable no-unused-vars */
import axios from "axios"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../../AuthContext"
import { ClassManagementContext } from "../../ClassManagementContext"
import { useContext } from "react"

export default function BookForm() {
    const [bookingStatus, setBookingStatus] = useState('')
    const [studentLevel, setStudentLevel] = useState('Beginner'); 
    const [danceCategory, setDanceCategory] = useState('Hip Hop');
    const {auth} = useAuth()
    const location = useLocation()
    const {formatDateTime, refreshSlots} = useContext(ClassManagementContext)
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const {classroomId, capacity, time, date, classroomNumber} = location.state
    console.log(classroomId, capacity, time, date, classroomNumber)
    console.log(formatDateTime(time, date))
    
    function formatForDisplay(startTime, date) {
        const [year, month, day] = date.split('-');
        // Convert start time to end time
        const [startHour, startMinute] = startTime.split(':');
        const endHour = (parseInt(startHour) + 1).toString().padStart(2, '0');
        
        // Convert month number to month name
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const monthName = monthNames[parseInt(month) - 1];

        return `${startTime}-${endHour}:00 ${monthName} ${day}, ${year}`;
    }


    const handleBooking = async () => {
        try{
            const token = auth.token
            const startDate = formatDateTime(time, date)
            if (!token) {
                console.error("Authorization token is not available.");
                return;
            }
            if (auth?.role !== 'teacher') {
                console.error("User is not authorized to make this request.");
                return;
            }

            const payload = {
                startDate: startDate,
                classroom: classroomId,
                rating: 0,
                capacity: capacity,
                studentLevel,
                danceCategory
            }
            const response = await axios.post(`${apiBaseUrl}/classes`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookingStatus('Class Booked Successfully')
            refreshSlots()

        }catch(error){
            setBookingStatus('Error Booking Class')
            console.error(error)
        }
    }
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Classroom {classroomNumber}</h2>
        <p className="mb-4">{formatForDisplay(time, date)} </p>
        <p className="mb-4">Room Capacity: {capacity} </p>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Student Level:</label>
            <select
                value={studentLevel}
                onChange={(e) => setStudentLevel(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Dance Category:</label>
            <select
                value={danceCategory}
                onChange={(e) => setDanceCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            >
                <option value="Ballet">Ballet</option>
                <option value="Ballroom">Ballroom</option>
                <option value="Contemporary">Contemporary</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Jazz">Jazz</option>
            </select>
        </div>
        <button
            onClick={handleBooking}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
            Book Class
        </button>
        {bookingStatus && <p className="mt-2">{bookingStatus}</p>}
    </div>
  )
}
