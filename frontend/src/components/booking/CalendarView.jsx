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
    fetchClasses
  } = useClassContext();
  const [selectedDayClasses, setSelectedDayClasses] = useState([]);
  const navigate = useNavigate();
  
  
  useEffect(() => {

    fetchClasses();
  }, [fetchClasses]);

  const handleDaySelect = ({ start }) => {
    const startOfDay = moment(start).startOf('day');
    const endOfDay = moment(start).endOf('day');

    const dayClasses = classes.filter(classItem => {
      const classDate = moment(classItem.start);
      return classDate.isSameOrAfter(startOfDay) && classDate.isSameOrBefore(endOfDay);
    });

    setSelectedDayClasses(dayClasses);
    navigate('/day-view', { state: {classes: dayClasses} });

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

