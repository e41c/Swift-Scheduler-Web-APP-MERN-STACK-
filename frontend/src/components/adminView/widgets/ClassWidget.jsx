import {useState, useEffect} from 'react'
import AdminWidget from './AdminWidget'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {useAuth} from "../../../AuthContext"
import {useAdmin} from '../../../AdminContext'



export default function ClassWidget() {
    const  {auth} = useAuth();
    const navigate = useNavigate()
    const [data,setData] = useState([]);
    const {classes} = useAdmin();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //             const response = await axios.get('/api/classes/', {
    //                 headers: { Authorization: `Bearer ${auth.token}` }
    //               });
    //             setData(response.data);


    //         }catch (error){
    //             console.log('Error:', error)
    //         }
    //     }
    //     fetchData()
    // },[]);



  return (
    <div className='size-fit
    bg-black 
    rounded-lg 
    shadow-sm shadow-stone-600
     hover:shadow-white cursor-pointer' 
     onClick={()=> navigate('/classesAdmin')}>
      <AdminWidget title={'Classes'} total={classes.length}></AdminWidget>
    </div>
  )
}
