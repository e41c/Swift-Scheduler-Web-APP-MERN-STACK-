import React from 'react'
import './widget.scss'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ClassIcon from '@mui/icons-material/Class';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';

const Widget = ({type}) => {
    let data;
    const amount = 20;
    const percent = 22;

    switch(type){
        case 'students':
            data = {
                title: 'Students',
                link: 'See all students',
                icon: <SchoolIcon className='icon'/>
            }
            break;
        case 'teachers':
            data = {
            title: 'Teachers',
            link: 'See all teachers',
            icon: <BadgeIcon className='icon'/>
            }
            break;
        case 'classes':
            data = {
                title: 'Classes',
                link: 'See all classes',
                icon: <ClassIcon className='icon'/>
            }
            break;
        default: data ={}
        break;
    }



  return (
    <div className='widget'>
      <div className="left">
        <div className="title">
            <h3>{data.title}</h3>
        </div>
        <div className="counter">{amount}</div>
        <div className="link">{data.link}</div>
      </div>


      <div className="right">
        <div className="percentage positive">
            <KeyboardDoubleArrowUpIcon/>
            {percent}%
        </div>
        {data.icon}
      </div>

    </div>
  )
}

export default Widget
