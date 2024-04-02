import {useState, useEffect} from 'react'
import AdminWidget from './AdminWidget'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import axios from 'axios'
import {useAdmin} from '../../../AdminContext'


export default function TeacherWidget() {

  const navigate = useNavigate()
  const {teachers} = useAdmin();

  return (
    <div className='size-fit
    bg-black 
    rounded-lg 
    shadow-sm shadow-stone-600
     hover:shadow-white cursor-pointer' 
     onClick={()=> navigate('/teacherAdmin')}>
      <AdminWidget title={'Teachers'} total={teachers.length}></AdminWidget>
    </div>
  )
}
