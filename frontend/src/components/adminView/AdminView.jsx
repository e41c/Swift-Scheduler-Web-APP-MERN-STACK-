
import StudentWidget from './widgets/StudentWidget'
import TeacherWidget from './widgets/TeacherWidget'
import ClassWidget from './widgets/ClassWidget'
import StudentTable from './tables/StudentTable'
import ClassroomWidget from './widgets/ClassroomWidget'
import TeacherTable from './tables/TeacherTable'



const AdminView = () => {

  return (
    <div className='size-full flex flex-col'> 
      <div className='w-full flex flex-row justify-center
       sm:flex-col sm:space-x-0 sm:space-y-5
       md:flex-row md:space-x-5 md:space-y-0
        flex-wrap'>
        <StudentWidget/>
        <TeacherWidget/>
        <ClassWidget/>
        <ClassroomWidget/>

      </div>
      <div className='text-white flex flex-col'>
        <StudentTable className=''></StudentTable>
        <TeacherTable className=''></TeacherTable>

      </div>


    </div>
  )
}

export default AdminView
