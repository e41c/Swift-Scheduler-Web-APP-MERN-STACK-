/* eslint-disable no-unused-vars */
//import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"

export default function ToolBar(toolbar) {
    const goToBack = () => {
        toolbar.onNavigate('PREV')
    }
    const goToNext = () => {
        toolbar.onNavigate('NEXT');
      };
    
    const goToCurrent = () => {
        const now = new Date();
        toolbar.date.setMonth(now.getMonth());
        toolbar.date.setYear(now.getFullYear());
        toolbar.onNavigate('CURRENT', now);
    };
    const label = () => {
        const date = moment(toolbar.date);
        return <span><b>{date.format('MMMM YYYY')}</b></span>;
    };
  return (
    <div className="toolbar-container">
      <label>{label()}</label>
      <button onClick={goToBack}>&#8249;</button>
      <button onClick={goToNext}>&#8250;</button>
      
    </div>
  )
}
