/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
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
  
  
  useEffect(() => {

    fetchClasses();
  }, [fetchClasses]);


  // const handleDaySelect = ({ start }) => {
  //   const selectedDay = moment.utc(start).format('YYYY-MM-DD');
  //   const dayClasses = classes.filter(cls => 
  //     moment.utc(cls.start).format('YYYY-MM-DD') === selectedDay
  //   );
  
  //   navigate('/day-view', { state: { classes: dayClasses } });
  // };
  const handleDaySelect = ({ start }) => {
    // Format the selected day as a string in Eastern Time
    const selectedDay = moment(start).tz('America/Toronto').format('YYYY-MM-DD');
    
    // Filter classes that occur on the selected day
    const dayClasses = classes.filter(cls => 
      moment.tz(cls.start, 'America/Toronto').format('YYYY-MM-DD') === selectedDay
    );
  
    navigate('/day-view', { state: { classes: dayClasses } });
  };

  // const handleDaySelect = ({ start }) => {
   
  //   const formattedStartOfDay = formatDate(start);
  
  //   const dayClasses = classes.filter(classItem => {
  //     // Compare dates in 'YYYY-MM-DD' format
  //     const formattedClassDate = formatDate(classItem.date);
  //     // console.log({formattedClassDate, formattedStartOfDay, id:  classItem._id});
  //     return formattedClassDate == formattedStartOfDay;
  //   });
  
  //   setSelectedDayClasses(dayClasses);
  //   navigate('/day-view', { state: { classes: dayClasses } });
  // };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading classes: {error.message}</div>;


  return (
    <div className="flex flex-col mt-[60px]"> 
      
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

  );
}

