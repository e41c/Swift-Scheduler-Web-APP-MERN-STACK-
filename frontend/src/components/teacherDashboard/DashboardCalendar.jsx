import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { ClassManagementContext } from "../../ClassManagementContext";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function DashboardCalendar() {
    const { setSelectedDate, selectedDate, availableSlots, isLoading, error } = useContext(ClassManagementContext);
    const [expandedRoom, setExpandedRoom] = useState(null);
    
    const navigate = useNavigate();

    const handleDateChange = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setSelectedDate(formattedDate);
    };

    const toggleRoom = (roomNumber) => {
        setExpandedRoom(expandedRoom === roomNumber ? null : roomNumber); // Toggle room visibility
    };

    const redirectToBookForm = (classroomId, capacity, time, classroomNumber) => {
        const startHour = time.split('-')[0];
        navigate(`/classroom/${classroomId}`, { state: { classroomId, capacity, time: startHour, date: selectedDate, classroomNumber } });
    };

    const formatTimeRange = (time) => {
        const startHour = time.split(':')[0];
        const endHour = (parseInt(startHour) + 1).toString().padStart(2, '0');
        return `${time}-${endHour}:00`;
    };

    return (
        <div className="bg-black text-white p-4">
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <>
                    <ReactDatePicker 
                        selected={new Date()} 
                        onChange={handleDateChange} 
                        className="bg-yellow-300 text-black p-2 rounded-md mb-4"
                    />
                    <div>
                        {availableSlots.map((slot, index) => (
                            <div key={index} className="mb-2">
                                <p className="flex items-center cursor-pointer" onClick={() => toggleRoom(slot.classroomNumber)}>
                                    <FontAwesomeIcon icon={faAngleDown} className="mr-2" />
                                    {slot.classroomNumber}
                                </p>
                                {expandedRoom === slot.classroomNumber && ( // Render slots if expanded room matches
                                    <>
                                        <p className="ml-4">Room capacity: {slot.capacity}</p>
                                        <p className="ml-4">Available slots:</p>
                                        <ul className="list-disc ml-4">
                                            {slot.availableSlots.map((time, idx) => (
                                                <li key={idx} onClick={() => redirectToBookForm(slot._id, slot.capacity, time, slot.classroomNumber)}>{formatTimeRange(time)}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
        // <div className="bg-black text-white p-4">
        //     {isLoading ? (
        //         <p>Loading...</p>
        //     ) : error ? (
        //         <p>Error: {error.message}</p>
        //     ) : (
        //         <>
        //             <ReactDatePicker 
        //                 selected={new Date()} 
        //                 onChange={handleDateChange} 
        //                 className="bg-yellow-300 text-black p-2 rounded-md mb-4"
        //             />
        //             <div>
        //                 {availableSlots.map((slot, index) => (
        //                     <div key={index} className="mb-2">
        //                         <p className="flex items-center cursor-pointer">
        //                             <FontAwesomeIcon icon={faAngleDown} className="mr-2" />
        //                             {slot.classroomNumber}
        //                         </p>
        //                         <p className="ml-4">Room capacity: {slot.capacity}</p>
        //                         <p className="ml-4">Available slots:</p>
        //                         <ul className="list-disc ml-4">
        //                             {slot.availableSlots.map((time, idx) => (
        //                                 <li key={idx} onClick={() => redirectToBookForm(slot._id, slot.capacity, time)}>{formatTimeRange(time)}</li>
        //                             ))}
        //                         </ul>
        //                     </div>
        //                 ))}
        //             </div>
        //         </>
        //     )}
        // </div>
    );
}

// export default function DashboardCalendar() {
//     const { setSelectedDate, selectedDate, availableSlots, isLoading, error } = useContext(ClassManagementContext);
//     const [selectedRoom, setSelectedRoom] = useState(null);
//     const [selectedTime, setSelectedTime] = useState(null);
//     const navigate = useNavigate();

//     const handleDateChange = (date) => {
//         const formattedDate = moment(date).format('YYYY-MM-DD');
//         setSelectedDate(formattedDate);
//     };

//     const toggleRoom = (room) => {
//         setSelectedRoom(selectedRoom === room ? null : room);
//         console.log("Selected Room:", selectedRoom === room ? null : room);
//     };

//     const toggleTimeSlot = (time) => {
//         setSelectedTime(selectedTime === time ? null : time);
//         console.log("Selected Time Slot:", selectedTime === time ? null : time);
//         // If a time slot is selected, automatically redirect to the BookForm
//         if (selectedRoom && selectedTime !== null) {
//             redirectToBookForm(selectedRoom._id, selectedRoom.capacity, time);
//         }
//     };

//     const redirectToBookForm = (classroomId, capacity, time) => {
//         if (selectedRoom && selectedTime !== null) {
//             // Navigate to the BookForm component with the selected room, time, date, and capacity
//             navigate(`/classroom/${classroomId}`, { state: { classroomId, capacity, time, date: selectedDate } });
//         } else {
//             // Handle case where room, time, or date are not selected
//             console.error("Please select a room and time.");
//         }
//     };

//     const formatTimeRange = (time) => {
//         const startHour = time.split(':')[0];
//         const endHour = (parseInt(startHour) + 1).toString().padStart(2, '0');
//         return `${time}-${endHour}:00`;
//     };

//     return (
//         <div className="bg-black text-white p-4">
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>Error: {error.message}</p>
//             ) : (
//                 <>
//                     <ReactDatePicker 
//                         selected={new Date()} 
//                         onChange={handleDateChange} 
//                         className="bg-yellow-300 text-black p-2 rounded-md mb-4"
//                     />
//                     <div>
//                         {availableSlots.map((slot, index) => (
//                             <div key={index} className="mb-2">
//                                 <p className="flex items-center cursor-pointer" onClick={() => toggleRoom(slot)}>
//                                     <FontAwesomeIcon icon={faAngleDown} className="mr-2" />
//                                     {slot.classroomNumber}
//                                 </p>
//                                 <p className="ml-4">Room capacity: {slot.capacity}</p>
//                                 <p className="ml-4">Available slots:</p>
//                                 {selectedRoom && selectedDate._id === slot._id && (
//                                     <ul className="list-disc ml-4">
//                                         {slot.availableSlots.map((time, idx) => (
//                                             <li key={idx} onClick={()=> toggleTimeSlot(time)}>{formatTimeRange(time)}</li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }
// export default function DashboardCalendar() {
//     const { setSelectedDate,
//          selectedDate,
//          availableSlots,
//          isLoading,
//          error } = useContext(ClassManagementContext);

//     const [selectedRoom, setSelectedRoom] = useState(null);
//     const [selectedTime, setSelectedTime] = useState(null);
//     const navigate = useNavigate();

//     const handleDateChange = (date) => {
//         const formattedDate = moment(date).format('YYYY-MM-DD');
//         setSelectedDate(formattedDate);
//     };

//     const toggleRoom = (roomNumber) => {
//         setSelectedRoom(selectedRoom === roomNumber ? null : roomNumber);
//         console.log("Selected Room:", selectedRoom === roomNumber ? null : roomNumber);
//     };

//     const toggleTimeSlot = (time) => {
//         setSelectedTime(selectedTime === time ? null : time);
//         console.log("Selected Time Slot:", selectedTime === time ? null : time);
//     };

//     const formatTimeRange = (time) => {
//         const startHour = time.split(':')[0];
//         const endHour = (parseInt(startHour) + 1).toString().padStart(2, '0');
//         return `${time}-${endHour}:00`;
//     };
//     const redirectToBookForm = (classroomId, capacity, time) => {
//         if (selectedRoom && selectedTime) {
//             // Navigate to the BookForm component with the selected room, time, date, and capacity
//             navigate(`/classroom/${classroomId}`, { state: { classroomId, capacity, time, date: selectedDate } });
//         } else {
//             // Handle case where room, time, or date are not selected
//             console.error("Please select a room and time.");
//         }

//     }

//     return (
//         <div className="bg-black text-white p-4">
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>Error: {error.message}</p>
//             ) : (
//                 <>
//                     <ReactDatePicker 
//                         selected={new Date()} 
//                         onChange={handleDateChange} 
//                         className="bg-yellow-300 text-black p-2 rounded-md mb-4"
//                     />
//                     <div>
                    
//                         {availableSlots.map((slot, index) => (
//                             <div key={index} className="mb-2">
//                                 <p className="flex items-center cursor-pointer" onClick={() => toggleRoom(slot.classroomNumber)}>
//                                     <FontAwesomeIcon icon={faAngleDown} className="mr-2" />
//                                     {slot.classroomNumber}
//                                 </p>
//                                 <p className="ml-4">Room capacity: {slot.capacity}</p>
//                                 <p className="ml-4">Available slots:</p>
//                                 {selectedRoom === slot.classroomNumber && (
//                                     <ul className="list-disc ml-4">
//                                         {slot.availableSlots.map((time, idx) => (
//                                             <li key={idx} onClick={()=> redirectToBookForm(slot._id, slot.capacity, time)}>{formatTimeRange(time)}</li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }



// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useContext } from "react";
// import moment from "moment";
// import { ClassManagementContext } from "../../ClassManagementContext";

// export default function DashboardCalendar() {
//     const { setSelectedDate, availableSlots, isLoading, error } = useContext(ClassManagementContext);

//     const handleDateChange = (date) => {
//         const formattedDate = moment(date).format('YYYY-MM-DD');
//         setSelectedDate(formattedDate);
//     };
    
//     return (
//         <div className="bg-black text-white p-4">
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>Error: {error.message}</p>
//             ) : (
//                 <>
//                     <ReactDatePicker 
//                         selected={new Date()} 
//                         onChange={handleDateChange} 
//                         className="bg-yellow-300 text-black p-2 rounded-md mb-4"
//                     />
//                     <div>
//                         {/* Display available slots here */}
//                         {availableSlots.map((slot, index) => (
//                             <div key={index} className="mb-2">
//                                 {/* Display slot information */}
//                                 <p>{slot.classroomNumber}</p>
//                                 <ul>
//                                     {slot.availableSlots.map((time, idx) => (
//                                         <li key={idx}>{time}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

