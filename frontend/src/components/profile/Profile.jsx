import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { useClassContext } from '../../ClassContext';

export default function Profile() {
    const { userData } = useAuth();
    const { userClassHistory, loading, error, fetchUserClassHistory, convertDateFormat, extractTime} = useClassContext();
    const [displayClasses, setDisplayClasses] = useState(null); // State to track which classes to display

    useEffect(() => {
        fetchUserClassHistory();
    }, [fetchUserClassHistory]);

    const getInitials = (userData) => {
        if (userData && userData.firstName && userData.lastName) {
            const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
            return initials.toUpperCase();
        }
        return '...';
    };

    const fullName = userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...';

    const handleDisplayClasses = (type) => {
        setDisplayClasses(type); // Set the displayClasses state to the selected type (upcoming or past)
    };

    // Determine which classes to display based on the displayClasses state
    let classList;
    if (displayClasses === 'upcoming') {
        classList = userClassHistory?.upcomingClasses || [];
        console.log("upcoming in profile comp: ", classList);
    } else if (displayClasses === 'past') {
        classList = userClassHistory?.pastClasses || [];
        console.log("past in profile comp: ", classList);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
      <div className="pt-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow">
            <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-700 font-semibold">
                    {getInitials(userData)}
                </div>
                <h1 className="text-3xl font-semibold mt-4">{fullName}</h1>
            </div>
            <div className="mt-6 flex justify-around text-sm font-semibold">
                <button onClick={() => handleDisplayClasses('upcoming')} className="py-2 px-4 bg-black text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black">
                    Upcoming
                </button>
                <button onClick={() => handleDisplayClasses('past')} className="py-2 px-4 bg-black text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black">
                    Previous
                </button>
            </div>
            <ul className="mt-4">
                {classList && classList.length > 0 ? (
                    classList.map((cls) => (
                        <li key={cls._id} className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-300 bg-white bg-opacity-75 backdrop-blur-lg">
                            <div className="flex justify-between">
                                <div className="font-semibold">{cls.danceCategory} - {cls.studentLevel}</div>
                                <div className="text-gray-500">{extractTime(cls.startDate)}, {convertDateFormat(cls.startDate)}</div>
                            </div>
                            <div className="mt-2">
                                <div className="text-xs text-gray-600">Classroom: {cls.classroom.classroomNumber}</div>
                                
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="text-center py-4 text-gray-500">No {displayClasses ? displayClasses : 'selected'} classes found.</div>
                )}
            </ul>
        </div>
      // <div className="pt-16 bg-white text-gray-800 p-4 rounded-lg shadow">
      //   <div className="flex flex-col items-center">
      //       <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-700 font-semibold">
      //           {getInitials(userData)}
      //       </div>
      //       <h1 className="text-3xl font-semibold mt-4">{fullName}</h1>
      //   </div>
      //   <div className="mt-6 flex justify-around text-sm font-semibold">
      //       <button onClick={() => handleDisplayClasses('upcoming')} className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-full transition-colors hover:border-gray-400 hover:text-gray-900 focus:outline-none focus:border-gray-400">
      //           Upcoming
      //       </button>
      //       <button onClick={() => handleDisplayClasses('past')} className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-full transition-colors hover:border-gray-400 hover:text-gray-900 focus:outline-none focus:border-gray-400">
      //           Previous
      //       </button>
      //   </div>
      //   <ul className="mt-4">
      //       {classList && classList.length > 0 ? (
      //           classList.map((cls) => (
      //               <li key={cls._id} className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition duration-300">
      //                   <div className="flex justify-between">
      //                       <div className="font-semibold">{cls.danceCategory} - {cls.studentLevel}</div>
      //                       <div className="text-gray-500">{extractTime(cls.startDate)}, {convertDateFormat(cls.startDate)}</div>
      //                   </div>
      //                   <div className="mt-2">
      //                       <div className="text-xs text-gray-600">Classroom: {cls.classroom.classroomNumber}</div>
      //                   </div>
      //               </li>
      //           ))
      //       ) : (
      //           <div className="text-center py-4 text-gray-500">No {displayClasses ? displayClasses : 'selected'} classes found.</div>
      //       )}
      //   </ul>
      // </div>
    );
}


// import { useState } from 'react';
// import { useAuth } from '../../AuthContext'
// import { useClassContext } from '../../ClassContext';
// export default function Profile() {
//     const {userData} = useAuth()
//     const {userClassHistory} = useClassContext()
//     const [displayClasses, setDisplayClasses] = useState('upcoming')
   
//     const getInitials = (userData) => {
//         if (userData && userData.firstName && userData.lastName) {
//           const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
//           return initials.toUpperCase();
//         }
//         return '...'; 
//       };
//     const fullName = userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...';

//     const handleDisplayClasses = (type) => {
//       setDisplayClasses(type);
//     }
//     // const [userClassHistory, setUserClassHistory] = useState({
//     //   pastClasses: [],
//     //   upcomingClasses: []
//     //  });
//     let classList;
//     if (displayClasses === 'upcoming') {
//         classList = userClassHistory?.upcomingClasses || [];
//     } else if (displayClasses === 'past') {
//         classList = userClassHistory?.pastClasses || [];
//     }

//   return (
//     <div className="pt-16 bg-white text-gray-800 p-4 rounded-lg shadow">
//             <div className="flex flex-col items-center">
//                 <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-700 font-semibold">
//                     {getInitials(userData)}
//                 </div>
//                 <h1 className="text-3xl font-semibold mt-4">{fullName}</h1>
//             </div>
//             <div className="mt-6 flex justify-around text-sm font-semibold">
//                 <button onClick={() => handleDisplayClasses('upcoming')} className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-full transition-colors hover:border-gray-400 hover:text-gray-900">
//                     Upcoming
//                 </button>
//                 <button onClick={() => handleDisplayClasses('past')} className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-full transition-colors hover:border-gray-400 hover:text-gray-900">
//                     Previous
//                 </button>
//             </div>
//             {classList && classList.length > 0 ? (
//                 <div>
//                     {classList.map((cls) => (
//                         <div key={cls._id}>
//                             <p>{cls.startDate} - {cls.studentLevel}</p>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div>No {displayClasses ? displayClasses : 'selected'} classes found.</div>
//             )}
//         </div>
//   )
// }


// import { useState } from 'react';
// import { useAuth } from '../../AuthContext';
// import { useClassContext } from '../../ClassContext';

// export default function Profile() {
//   const { userData } = useAuth();
//   const { userClassHistory } = useClassContext();
//   const [displayClasses, setDisplayClasses] = useState('upcoming');

//   // Error handling for userClassHistory
//   if (!userClassHistory) {
//     return <div>Loading class history...</div>; // Or any other loading state
//   }

//   // Continue with the rest of your code if userClassHistory is present
//   const getInitials = (userData) => {
//     if (userData && userData.firstName && userData.lastName) {
//       const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
//       return initials.toUpperCase();
//     }
//     return '...';
//   };
  
//   const fullName = userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...';
  
//   const handleDisplayClasses = (type) => {
//     setDisplayClasses(type);
//   };

//   // Ensure classList is always an array to prevent runtime errors
//   const classList = displayClasses === 'upcoming'
//     ? userClassHistory.upcomingClasses || [] 
//     : userClassHistory.pastClasses || [];

//   return (
//     <div className="pt-16 bg-white text-gray-800 p-4 rounded-lg shadow">
//       <div className="flex flex-col items-center">
//         <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-700 font-semibold">
//           {getInitials(userData)}
//         </div>
//         <h1 className="text-3xl font-semibold mt-4">{fullName}</h1>
//       </div>
//       <div className="mt-6 flex justify-around text-sm font-semibold">
//         <button onClick={() => handleDisplayClasses('upcoming')} className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-full transition-colors hover:border-gray-400 hover:text-gray-900">
//           Upcoming
//         </button>
//         <button onClick={() => handleDisplayClasses('past')} className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-full transition-colors hover:border-gray-400 hover:text-gray-900">
//           Previous
//         </button>
//       </div>
//       <div>
//         {classList.length > 0 ? classList.map((cls) => (
//           <div key={cls._id}>
//             <p>{cls.name} - {cls.date}</p>
//           </div>
//         )) : (
//           <div>No {displayClasses} classes found.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useAuth } from '../../AuthContext'
// import { useClassContext } from '../../ClassContext';
// import { useState } from 'react';
// export default function Profile() {

//     const {userData} = useAuth()
//     const {userClassHistory} = useClassContext()
//     const [displayClasses, setDisplayClasses] = useState('upcoming')

//     const getInitials = (userData) => {
//         if (userData && userData.firstName && userData.lastName) {
//           const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
//           return initials.toUpperCase();
//         }
//         return '...'; 
//       };
//     const fullName = userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...';

//     const handleDisplayClasses = (type) => {
//       // This function will be called with either 'upcoming' or 'past'
//       setDisplayClasses(type);
//     };

//     const classList = displayClasses === 'upcoming' ? userClassHistory.upcomingClasses : userClassHistory.pastClasses;

//   return (
//     <div className="pt-16 bg-white text-gray-800 p-4 rounded-lg shadow">
//       <div className="flex flex-col items-center">
//         <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-700 font-semibold">
//           {getInitials(userData)}
//         </div>
//         <h1 className="text-3xl font-semibold mt-4">{fullName}</h1>
//       </div>
//       <div className="mt-6 flex justify-around text-sm font-semibold">
//         <button onClick={()=> handleDisplayClasses('upcoming')} className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-full transition-colors hover:border-gray-400 hover:text-gray-900">
//           Upcoming
//         </button>
//         <button onClick={()=> handleDisplayClasses('past')} className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-full transition-colors hover:border-gray-400 hover:text-gray-900">
//           Previous
//         </button>
        
//       </div>
//       <div>
//         {classList.map((cls) => (
//           <div key={cls._id}> 
            
//             <p>{cls.name} - {cls.date}</p> 
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
