/* eslint-disable no-unused-vars */
import React, {createContext, useCallback, useContext, useState, useEffect} from 'react'
import axios from 'axios'
import { useAuth } from "./AuthContext"
import moment from 'moment';


const ClassContext = createContext({});


export const useClassContext = () => useContext(ClassContext);

export function ClassProvider({children}) {

    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState({});
    const [classrooms, setClassrooms] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useAuth();

    // const hasClassPassed = (classDate, classTime) => {
    //     // Get the current date and time in UTC
    //     const nowUTC = new Date(new Date().toUTCString());
      
    //     // Construct the class date and time in UTC
    //     // The 'Z' at the end of 'classDate' indicates that it is in UTC
    //     const classDateTimeString = `${classDate.split('T')[0]}T${classTime}:00Z`; // Splitting to remove the milliseconds
    //     const classDateTime = new Date(classDateTimeString);
      
    //     // Compare the two dates in UTC
    //     return classDateTime < nowUTC;
    //   };
    
    const hasClassPassed = (classDate, classTime) => {
        const classStart = moment.utc(classDate).set({
          hour: parseInt(classTime.split(':')[0], 10),
          minute: parseInt(classTime.split(':')[1], 10)
        });
        return moment().isAfter(classStart.add(30, 'minutes'));
    };

    const formatDate = (utcDate) => {
        return moment.utc(utcDate).format('YYYY-MM-DD'); 
    };

    const formatDateTime = (utcDate, utcTime) => {
        
        const dateTimeString = `${utcDate.split('T')[0]}T${utcTime}:00.000Z`; // Ensure the date and time are properly combined into an ISO 8601 format
        const dateTime = moment(dateTimeString).toDate(); // Parse as a Date object
        return dateTime;
    };


    const fetchTeachers = useCallback(async () => {
        if (!auth.token) return;
        setLoading(true);
        try {
          const response = await axios.get('/auth/teachers', {
            headers: { Authorization: `Bearer ${auth.token}` }
          });
          const teachersById = response.data.reduce((acc, teacher) => {
            acc[teacher._id] = teacher; // Assume each teacher has a unique _id field
            return acc;
          }, {});
          setTeachers(teachersById);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }, [auth.token]);



      const fetchClasses = useCallback(async () => {
        if (!auth.token || Object.keys(teachers).length === 0) {
          return;
        }
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get('/api/classes', {
            headers: { Authorization: `Bearer ${auth.token}` }
          });
          const classesWithDetails = response.data.map(cls => {
            const teacher = teachers[cls.teacher];
            const start = formatDateTime(cls.date, cls.time);
            const end = moment(start).add(1, 'hour').toDate(); // Add 1 hour for example
            return {
              ...cls,
              teacher: teacher,
              start: start,
              end: end,
              allDay: false //true
            };
          });
          setClasses(classesWithDetails);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }, [auth.token, teachers]);
      

      useEffect(() => {
        fetchTeachers();
      }, [auth.token, fetchTeachers]);
    
      // Fetch classes when teachers are set or auth.token changes
      useEffect(() => {
        if (Object.keys(teachers).length > 0) {
          fetchClasses();
        }
      }, [teachers, auth.token, fetchClasses]);
      
    // const fetchTeacherById = useCallback(async (teacherId) => {
    //   if (!auth.token || !teacherId) return null;
    //   try {
          
    //       if (teachers[teacherId]) {
    //           return teachers[teacherId];
    //       }
    //       const response = await axios.get(`/api/auth/teacher/${teacherId}`, {
    //           headers: { Authorization: `Bearer ${auth.token}` }
    //       });
          
    //       setTeachers(prevTeachers => ({
    //           ...prevTeachers,
    //           [teacherId]: response.data
    //       }));
    //       return response.data; 
    //   } catch (err) {
    //       setError(err);
    //   }
    // }, [auth.token, teachers]);

    // const fetchClasses = useCallback(async () => {
    //   if (!auth.token) {
    //       return;
    //   }
    //   setLoading(true);
    //   setError(null);
    //   try {
    //       const response = await axios.get('/api/classes', {
    //           headers: { Authorization: `Bearer ${auth.token}` }
    //       });
    //       // Process the class data to add date objects
    //       const classesWithDetails = await Promise.all(response.data.map(async cls => {

    //           const teacher = await fetchTeacherById(cls.teacher);
    //           const classDate = moment.utc(cls.date).local();
    //           const endDate = moment.utc(cls.date).local().add(1, 'day');
              
    //           return {
    //               ...cls,
    //               teacher: teacher, 
    //               // Do the same for classroom
    //               start: classDate.toDate(),
    //               end: endDate.toDate(),
    //               allDay: true
    //           };
    //       }));
    //       setClasses(classesWithDetails);
    //   } catch (err) {
    //       setError(err);
    //   } finally {
    //       setLoading(false);
    //   }
    // }, [auth.token, fetchTeacherById]);


  return (
    <ClassContext.Provider value={{classes,
        teachers,
        classrooms,
        loading,
        error,
        fetchClasses,
        hasClassPassed,
        formatDate,
        formatDateTime,
    }}>
        {children}
    </ClassContext.Provider>
  )
}
