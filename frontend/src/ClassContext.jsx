/* eslint-disable no-unused-vars */
import React, {createContext, useCallback, useContext, useState} from 'react'
import axios from 'axios'
import { useAuth } from "./AuthContext"


const ClassContext = createContext({});


export const useClassContext = () => useContext(ClassContext);

export function ClassProvider({children}) {

    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useAuth();

    const fetchClasses = useCallback(async () => {
        if (!auth.token) {
          return;
        }
        setLoading(true);
        try {
          const response = await axios.get('/api/classes', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          });
          const classesWithDates = response.data.map(cls => ({
            ...cls,
            start: new Date(cls.date),
            end: new Date(cls.date),
            allDay: true
          }));
          setClasses(classesWithDates);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
    }, [auth.token]);

  return (
    <ClassContext.Provider value={{classes,
     teachers,
     classrooms,
     loading,
     error,
     fetchClasses
    }}>
        {children}
    </ClassContext.Provider>
  )
}
