import React from 'react';
import { useAdmin } from '../../../AdminContext';

function StudentTable() {
  const { students } = useAdmin();

  return (
    <div className='flex  flex-col justify-center m-2'>
      <table className='table-auto bg-black size-0'>
        <thead>
          <tr>
          <th className='px-8 py-4 bg-indigo-600' >Student Id</th>
            <th className='px-8 py-4 bg-indigo-600' >First Name</th>
            <th className='px-8 py-4 bg-indigo-600' >Last Name</th>
            <th className='px-8 py-4 bg-indigo-600' >Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className='border px-8 py-4'>{student._id}</td>
              <td className='border px-8 py-4'>{student.firstName}</td>
              <td className='border px-8 py-4'>{student.lastName}</td>
              <td className='border px-8 py-4'>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;