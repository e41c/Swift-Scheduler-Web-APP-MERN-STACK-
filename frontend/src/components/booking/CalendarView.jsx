/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from "react-router-dom";
import ToolBar from "../ToolBar";
import { useClassContext } from "../../ClassContext";
moment.tz.setDefault('America/Toronto');
const localizer = momentLocalizer(moment);

export default function CalendarView() {

  const {
    classes, 
    loading, 
    error, 
    fetchClasses,
    hasClassPassed,
    formatDate
  } = useClassContext();
  const [selectedDayClasses, setSelectedDayClasses] = useState([]);
  const navigate = useNavigate();

  const { auth } = useAuth();
  // console.log("this is calendar view auth:",auth);
  
  
  useEffect(() => {

    fetchClasses();
  }, [fetchClasses]);


  
  const handleDaySelect = ({ start }) => {
    // Format the selected day as a string in Eastern Time
    const selectedDay = moment(start).tz('America/Toronto').format('YYYY-MM-DD');
    
    // Filter classes that occur on the selected day
    const dayClasses = classes.filter(cls => 
      moment.tz(cls.start, 'America/Toronto').format('YYYY-MM-DD') === selectedDay
    );
  
    navigate('/day-view', { state: { classes: dayClasses } });
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading classes: {error.message}</div>;


  return (

    <div className="flex flex-col mt-0"> 
    
    
    {auth.role === 'teacher' && (
      <div className="flex items-center self-end mr-4 mt-4 text-white"> 
        <p className="text-lg mr-2">Book Classroom</p>
        <FontAwesomeIcon
          icon={faChalkboardUser}
          onClick={() => navigate('/class-management')} 
          className="cursor-pointer text-xl" 
        />
      </div>
    )}

    <Calendar
      localizer={localizer}
      events={classes}
      selectable
      onSelectSlot={handleDaySelect}
      className="bg-white text-gray-700"
      style={{ height: 'calc(100vh - 60px)' }} 
      views={['month', 'week', 'day']}
      components={{
        toolbar: ToolBar
      }}
    />
  </div>
    // <div className="flex flex-col mt-[60px]"> 

      

    //   <FontAwesomeIcon icon={faChalkboardUser} />
    //   <Calendar
    //     localizer={localizer}
    //     events={classes}
    //     selectable
    //     onSelectSlot={handleDaySelect}
    //     className="bg-white text-gray-700"
    //     style={{ height: 'calc(100vh - 60px)' }}
    //     views={['month', 'week', 'day']}
    //     components={{
    //       toolbar: ToolBar
    //     }}
    //   />
  
    // </div>

  );
}

