import {useAdmin} from '../../../AdminContext'
import AdminWidget from './AdminWidget'
import { useNavigate } from 'react-router-dom';



export default function StudentWidget() {
    const navigate = useNavigate()
    const {students} = useAdmin();

  return (
    <div className='size-fit
    bg-black 
    rounded-lg 
    shadow-sm shadow-stone-600
     hover:shadow-white cursor-pointer' 
     onClick={()=> navigate('/studentAdmin')}>
      <AdminWidget  title={"Students"} total={students.length}></AdminWidget>
    </div>
  )
}
