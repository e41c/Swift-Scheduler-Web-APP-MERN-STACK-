/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from "react-router-dom";
import ToolBar from "../ToolBar";
import { useClassContext } from "../../ClassContext";
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


  const handleDaySelect = ({ start }) => {
   
    const formattedStartOfDay = formatDate(start);
  
    const dayClasses = classes.filter(classItem => {
      // Compare dates in 'YYYY-MM-DD' format
      const formattedClassDate = formatDate(classItem.date);
      // console.log({formattedClassDate, formattedStartOfDay, id:  classItem._id});
      return formattedClassDate == formattedStartOfDay;
    });
  
    setSelectedDayClasses(dayClasses);
    navigate('/day-view', { state: { classes: dayClasses } });
  };
  
  

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

