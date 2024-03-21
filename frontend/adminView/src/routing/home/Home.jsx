import React from 'react'
import './home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widgets/Widget'
import DataTable from '../../components/widgets/DataTable'
import StudentTable from '../../components/widgets/StudentTable'


const Home = () => {

  return (
    <div className='Home'>
      <Sidebar/>
      <div className='homeContainer'>

        <div className='widgets'>
            <Widget type='students'/>
            <Widget type='teachers'/>
            <Widget type='classes'/>
        </div>
        <div className="tables">
          <StudentTable/>
        </div>
      </div>
    </div>
  )
}

export default Home
