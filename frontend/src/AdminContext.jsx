import {useState, useContext, createContext, useEffect, useCallback} from 'react'
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import {useAuth} from './AuthContext'

const  AdminContext = createContext({})
export const useAdminContext = () => useContext(AdminContext);

export function AdminProvider(props) {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(null);
  const {auth} = useAuth();

  const fetchTeachers = useCallback(async () => {
    if (!auth.token) return;
    setLoading(true);

    try{
      const res = await axios.get('/auth/teachers', {headers: {Authorization: `Bearer ${auth.token}`}});
      setTeachers(res.data)
    }
    catch(error){
      console.log("Error getting teachers", error)
    }
    finally{
      setLoading(false)
    }
  },[auth.token] );

  const fetchStudents = useCallback(async () => {
    if (!auth.token) return;
    setLoading(true);

    try{
      const res = await axios.get('/auth/students', {headers: {Authorization: `Bearer ${auth.token}`}});
      setStudents(res.data)
    }
    catch(error){
      console.log("Error getting Students", error)
    }
    finally{
      setLoading(false)
    }
  },[auth.token] );



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

const fetchClasses = useCallback(async () => {
  if (!auth.token) return;
  setLoading(true);
  try{
    const response = await axios.get('/api/classes', {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    setClasses(response.data);
  } catch (error) {
    setError(error);

  }finally {
    setLoading(false);
  }
}, [auth.token]);

useEffect(() => {
  fetchClassrooms();

}, [fetchClassrooms]);

useEffect(() => {
  fetchClasses();

}, [fetchClasses]);

useEffect(() => {
  fetchTeachers();

}, [fetchTeachers]);

useEffect(() => {
  fetchStudents();

}, [fetchStudents]);

 return(
    <AdminContext.Provider value={{classrooms, teachers, students, classes}}>
      { props.children}
    </AdminContext.Provider>
  )
}

