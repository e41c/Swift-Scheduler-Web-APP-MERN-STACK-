import { useLocation, useNavigate } from "react-router-dom";

export default function ListView() {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = location.state?.classes ?? [];

  return (
    
    <div className="mt-16">
      {classes.length > 0 ? (
        classes.map((cls, index) => (
          <div 
            key={index} 
            className="mb-4 p-4 shadow-lg rounded-lg bg-white"
            onClick={() => navigate(`/class/${cls._id}`, { state: {classInfo: cls} })}
            >
            <h2 className="text-xl font-bold">{cls.danceCategory}</h2>
            <p>Level: {cls.studentLevel}</p>
            <p>Date: {new Date(cls.date).toLocaleDateString()}</p>
            <p>Time: {cls.time}</p>
          </div>
        ))
      ) : (
        <p className="text-center">No classes available for this day.</p>
      )}
    </div>
  );
}

