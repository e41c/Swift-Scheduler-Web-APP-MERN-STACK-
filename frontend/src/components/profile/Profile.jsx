import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { useClassContext } from '../../ClassContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons';


export default function Profile() {
    const { userData, auth } = useAuth();
    const { userClassHistory, loading, error, fetchUserClassHistory, convertDateFormat, extractTime} = useClassContext();
    const [displayClasses, setDisplayClasses] = useState(null);
    const [expandedClassId, setExpandedClassId] = useState(null); 

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

    function capitalizeFullName(firstName, lastName) {
        const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
        const fullName = capitalizedFirstName + ' ' + capitalizedLastName;
        return fullName;
    }

    const toggleClassDetails = (classId) => {
        if (expandedClassId === classId) {
          setExpandedClassId(null);
        } else {
          setExpandedClassId(classId);
        }
      };

    const handleDisplayClasses = (type) => {
        setDisplayClasses(type);
    };

    let classList;
    if (displayClasses === 'upcoming') {
        classList = userClassHistory?.upcomingClasses || [];
    } else if (displayClasses === 'past') {
        classList = userClassHistory?.pastClasses || [];
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleDeleteClass = async (classId) => {
        try {
            const response = await fetch(`/api/classes/${classId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    // 'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                // Class deleted successfully, update UI or refetch data
                console.log('Class deleted successfully');
                // Example: refetch data
                fetchUserClassHistory();
            } else {
                console.error('Failed to delete class');
            }
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };

    return (
        <div className="pt-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow">
            <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-700 font-semibold">
                    {getInitials(userData)}
                </div>
                <h1 className="text-3xl font-semibold mt-4">{userData ? capitalizeFullName(userData.firstName, userData.lastName) : 'Loading...'}</h1>
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
                                <div className="text-xs text-gray-600">{capitalizeFullName(cls.teacher.firstName, cls.teacher.lastName)}</div>
                            </div>
                            <div className="mt-2">
                                <div className="text-xs text-gray-600">Classroom: {cls.classroom.classroomNumber}</div>
                            </div>
                            <div className="mt-2">
                                {auth.role === 'teacher' && displayClasses === 'upcoming' && (
                                    <>
                                        <button onClick={() => handleDeleteClass(cls._id)} className="flex items-center text-xs text-red-600">
                                            <FontAwesomeIcon icon={faTrash} className="mr-2 text-xl text-red-600" />
                                            {/* {'Delete Class'} */}
                                        </button>
                                        <button onClick={() => toggleClassDetails(cls._id)} className="flex items-center text-xs text-red-600">
                                            <FontAwesomeIcon icon={expandedClassId === cls._id ? faArrowUp : faArrowDown} className="text-xl text-red-600" />
                                            {expandedClassId === cls._id ? 'Hide Details ' : 'View Details '}
                                        </button>
                                    </>
                                )}
                                
                            </div>
                            {expandedClassId === cls._id && (
                                <div className="mt-2 bg-gray-100 p-2 rounded-md">
                                    <p className="text-sm text-gray-800 font-semibold">Enrolled Students:</p>
                                    <ul className="text-sm text-gray-800">
                                        {cls.studentsEnrolled.length > 0 ? (
                                            cls.studentsEnrolled.map(student => (
                                                <li key={student._id}>{capitalizeFullName(student.firstName, student.lastName)}</li>
                                            ))
                                        ) : (
                                            <li>No students enrolled</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <div className="text-center py-4 text-gray-500">No {displayClasses ? displayClasses : 'selected'} classes found.</div>
                )}
            </ul>
        </div>
    );
}

    