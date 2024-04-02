 import React, {createContext, useCallback, useContext, useState, useEffect} from 'react'
 import axios from 'axios'
 import { useAuth } from "./AuthContext"


 const AdminContext = createContext({});
 export const useAdmin = () => useContext(AdminContext);

 export function AdminProvider ({children}){
    const [error, setError] =  useState(null)
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState({});
    const [classrooms, setClassrooms] = useState({});
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const {auth} = useAuth();

    const fetchTeachers = useCallback(async () => {
        if (!auth.token) return;
       setLoading(true);
       try {
         const response = await axios.get('/auth/teachers', {
           headers: { Authorization: `Bearer ${auth.token}` }
          });
         setTeachers(response.data);
         } catch (error) {
           setError(error);
         } finally {
           setLoading(false);
         }
      }, [auth.token]);
      const fetchClassrooms = useCallback(async () => {
        if (!auth.token) return;
        setLoading(true);
        try{
          const response = await axios.get('/api/classrooms', {
            headers: { Authorization: `Bearer ${auth.token}` }
          });

          setClassrooms(response.data);
        } catch (error) {
          setError(error);

        }finally {
          setLoading(false);
        }
    }, [auth.token]);

      const fetchStudents = useCallback(async () => {
        if (!auth.token) return;
       setLoading(true);
       try {
         const response = await axios.get('/auth/students', {
           headers: { Authorization: `Bearer ${auth.token}` }
          });
         setStudents(response.data);
         } catch (error) {
           setError(error);
         } finally {
           setLoading(false);
         }
      }, [auth.token]);
      
      const fetchClasses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get('/api/classes', {
            headers: { Authorization: `Bearer ${auth.token}` }
          });
          setClasses(response.data);
          console.log(classes)
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }, [auth.token, teachers, classrooms]);

      useEffect(() => {
        fetchTeachers();
      }, [auth.token, fetchTeachers]);


      useEffect(() => {
        fetchStudents();
      },[auth.token, fetchStudents])

      useEffect(() => {
        fetchClassrooms();
      }, [fetchClassrooms]);

      useEffect(() => {
        fetchClasses();
      }, [fetchClasses])

    return (
        <AdminContext.Provider value={{classes,
         teachers, 
         students, 
         classrooms, 
         loading, 
         fetchClasses,
         fetchStudents, 
         fetchTeachers,
         fetchClassrooms,
         setClasses,
         error}}>
            {children}
        </AdminContext.Provider>
    )
    
}
