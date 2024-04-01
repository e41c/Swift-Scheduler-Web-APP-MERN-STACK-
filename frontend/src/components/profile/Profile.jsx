import { useAuth } from '../../AuthContext'
export default function Profile() {
    const {userData} = useAuth()
   
    const getInitials = (userData) => {
        if (userData && userData.firstName && userData.lastName) {
          const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
          return initials.toUpperCase();
        }
        return '...'; 
      };
      const fullName = userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...';
  return (
    <div className="pt-16 bg-white text-gray-800 p-4 rounded-lg shadow">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-700 font-semibold">
          {getInitials(userData)}
        </div>
        <h1 className="text-3xl font-semibold mt-4">{fullName}</h1>
      </div>
      <div className="mt-6 flex justify-around text-sm font-semibold">
        <button className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-full transition-colors hover:border-gray-400 hover:text-gray-900">
          Upcoming
        </button>
        <button className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-full transition-colors hover:border-gray-400 hover:text-gray-900">
          Previous
        </button>
        
      </div>
    </div>
  )
}