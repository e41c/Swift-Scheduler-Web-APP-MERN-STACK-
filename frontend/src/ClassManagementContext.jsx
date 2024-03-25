import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import moment from 'moment';

export const ClassManagementContext = createContext();

// eslint-disable-next-line react/prop-types
export const ClassManagementProvider = ({ children }) => {

    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useAuth();

    useEffect(() => {
        console.log("this is the role right before api call in useeffect", auth?.role)
        if(auth?.role === 'teacher') {
            fetchAvailableSlotsByDay(selectedDate);
        }
    }, [selectedDate, auth]);


    function formatDateTime(time, date) {
        // Split the time into hours and minutes
        const [hours, minutes] = time.split(':').map(Number);
    
        // Create a new Date object using the provided date
        const dateTime = new Date(date);
    
        // Adjust the time to the timezone offset (-4 hours)
        dateTime.setUTCHours(hours - 4, minutes);
    
        // Format the date in ISO 8601 format with timezone offset
        const isoDateTimeString = dateTime.toISOString().replace('Z', '-04:00');
    
        // Return the formatted ISO string
        return isoDateTimeString;
    }

    const fetchAvailableSlotsByDay = async (date) => {
        if (!auth?.token) {
            console.error("Authorization token is not available.");
            return;
        }
        if (auth?.role !== 'teacher') {
            console.error("User is not authorized to make this request.");
            setError(new Error("Unauthorized"));
            return;
        }
        
        setIsLoading(true);
        setError(null); // Clear previous errors

        try {
            const response = await axios.get('/api/classrooms/available-rooms', {
                params: { date },
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            setAvailableSlots(response.data);
            console.log(response.data);
        } catch (error) {
            setError(error);
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <ClassManagementContext.Provider value={{ availableSlots, selectedDate, setSelectedDate, isLoading, error, fetchAvailableSlotsByDay, formatDateTime }}>
            {children}
        </ClassManagementContext.Provider>
    );
}