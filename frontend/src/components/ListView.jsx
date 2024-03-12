import { useLocation } from "react-router-dom";

export default function ListView() {
  const location = useLocation();
  const classes = location.state?.classes ?? [];

  return (
    // Adjust 'mt-16' to the height of your navbar. If your navbar is taller, increase the value accordingly.
    <div className="mt-16">
      {classes.length > 0 ? (
        classes.map((cls, index) => (
          <div key={index} className="mb-4 p-4 shadow-lg rounded-lg bg-white">
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

