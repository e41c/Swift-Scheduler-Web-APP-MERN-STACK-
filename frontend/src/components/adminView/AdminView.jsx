import React from 'react'
import { useAdminContext } from '../../AdminContext'
import AdminWidget from './widget/AdminWidget'
import { useNavigate } from 'react-router-dom';
import { StudentTable } from './table/StudentTable';
import{ TeacherTable} from './table/TeacherTable'
import { ClassesTable } from './table/ClassesTable';
import { ClassroomTable } from './table/ClassroomTable';

function AdminView() {
    const navigate = useNavigate();
    const {classrooms, teachers, students, classes} = useAdminContext();
  return (
    <div className='flex flex-col text-white'>
        <div className='flex p-3
         md:flex-row md:space-x-4 md:space-y-0
         sm:flex-col sm:space-y-4
         justify-center flex-wrap gap-2'>
            <AdminWidget link={'/admin-classroom'} count={classrooms.length} title='Classrooms' ></AdminWidget>
            <AdminWidget link={'/admin-teacher'} count={teachers.length} title='Teachers'></AdminWidget>
            <AdminWidget link={'/admin-student'} count={students.length} title='Students'></AdminWidget>
            <AdminWidget link={'/admin-classes'} count={classes.length} title='Classes'></AdminWidget>
        

        </div>
        <div className='p-3 flex flex-col gap-2' >
            <StudentTable></StudentTable>
            <TeacherTable></TeacherTable>
            <ClassesTable></ClassesTable>
            <ClassroomTable></ClassroomTable>
        </div>
    </div>
  )
}

export default AdminView
