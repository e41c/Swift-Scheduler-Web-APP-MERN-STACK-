import React from 'react'
import './sidebar.scss'
import companyLogo from '../../assets/images/SwiftScheduleDisplay.jpeg'
import HomeIcon from '@mui/icons-material/Home';
import ClassIcon from '@mui/icons-material/Class';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  
  return (
    <div className='Sidebar'>
        <div className='top'>
            <span className='logo'><img src={companyLogo} width={200} height={100} alt='Company Logo' /></span>
        </div>
        <div className='center'>
            <ul>
                <li onClick={()=> navigate('/')}>
                  <HomeIcon/>
                  <span > Home</span>
                  </li>
                <li onClick={() => navigate('/students')}>
                  <SchoolIcon/>
                  <span > Students</span>
                  </li>
                <li onClick={()=> navigate('/teachers')}>
                  <BadgeIcon/>
                  <span > Teachers</span>
                  </li>
                  <li onClick={()=> navigate('/classes')}>
                    <ClassIcon></ClassIcon>
                    <span > Classes</span>
                  </li>
                  <li>
                    <SettingsIcon />
                    <span> Settings</span>
                  </li>
                  <li>
                    <LogoutIcon></LogoutIcon>
                    <span> Log Out</span>
                  </li>
            </ul>
        </div>
        
    </div>
  )
}

export default Sidebar
