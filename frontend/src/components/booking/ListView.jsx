import { useLocation, useNavigate } from "react-router-dom";
import { useClassContext } from "../../ClassContext";
export default function ListView() {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = location.state?.classes ?? [];
  const { hasClassPassed, formatDate } = useClassContext();


  const calculateAvailableSpots = (cls) => cls.capacity - cls.studentsEnrolled.length;

  
  
  

  return (
    <div className="mt-16">
      {classes.length > 0 ? (
        classes.map((cls, index) => {
          const availableSpots = calculateAvailableSpots(cls);
          const classPassed = hasClassPassed(cls.date, cls.time);

          
          console.log(`Class ID: ${cls._id}, Passed: ${classPassed}, Available Spots: ${availableSpots}`);

          return (
            <div 
              key={index} 
              className={`mb-4 p-4 shadow-lg rounded-lg ${classPassed ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'} `}
              onClick={() => {
                // Only navigate if the class has not passed and there are available spots
                if (!classPassed && availableSpots > 0) {
                  navigate(`/class/${cls._id}`, { state: { classInfo: cls } });
                }
              }}
            >
              <h2 className="text-xl font-bold">{cls.studentLevel}, {cls.danceCategory}</h2>
              <p>Teacher: {cls.teacher.firstName} {cls.teacher.lastName}</p>
              <p>Date: {formatDate(cls.date)}</p>
              <p>Time: {cls.time}</p>

              {classPassed ? (
                <p className="text-gray-500">Class has passed</p>
              ) : availableSpots > 0 ? (
                <p>{availableSpots} spots available</p>
              ) : (
                <p className="text-red-500">Class is full</p>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-white text-center">No classes available for this day.</p>
      )}
    </div>
  );
}



