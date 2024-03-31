import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import CourseSlides from './CourseSlides'
import WelcomeBanner from './WelcomeBanner'
import HistoryBanner from './HistoryBanner'
import { Search, StepBack, StepForward } from 'lucide-react'
import { useAuth } from '../../AuthContext'
import { useClassContext } from '../../ClassContext'

function Home() {
    const {auth} = useAuth();

    const [search, setSearch] = useState("");
    const [rating, setRating] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const {userClassHistory, submitRating} = useClassContext();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/classes/filter/byAttributes?danceCategory=${search}`,{headers: {Authorization: `Bearer ${auth.token}`}});
            setSearchResults(response.data);
            console.log("Search Results", response.data);
        } catch (error) {
            console.log("Opps! an error has occured while searching classes", error);
        }
    };

    const handleRatingChange = (classId, rating) => {
        setRating(prevRatings => ({
            ...prevRatings,
            [classId]: rating
        }));
    };
    
    const handleSubmitRating = async (classId) => {
        const studentRating = rating[classId]; // Use rating instead of ratings
        try {
            await axios.post(`/api/classes/rate/${classId}`, { rating: studentRating }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            console.log(`Rating ${studentRating} submitted for class ${classId}`);
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };
    

    return (
        <>
            <div className="w-full h-auto">
                <WelcomeBanner />
                <div className="w-full h-auto flex items-center justify-between gap-7 lg:py-16 md:py-14 sm:py-12 py-10
                lg:px-24 md:px-16 sm:px-6 px-4">
            <div className="w-full h-auto flex items-center justify-center flex-col">
                <h3 className="lg:text-lg md:text-lf sm:text-base text-base font-medium
                text-gray-200 flex items-center gap-x-2 bg-black/16 rounded-t-md py-2 px-4">
                    <Search />
                    Search Over 1000+ of Our Courses Here
                </h3>
                <div className="w-full h-auto flex items-end justify-center bg-black/15 rounded-md lg:gap-5 md:gap-5
                    sm:gap-3 gap-2 py-10 lg:px-0 md:px-0 sm:px-2 px-4 flex-wrap">
                    <div className="w-3/5"> 
                        <input 
                            id="course_name"
                            name="course-name"
                            type="text"
                            placeholder="Search"
                            className="w-full p-2 border border-gray-300 rounded-l-md"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-1/5 justify-center"> 
                        <button 
                            className="w-full text-base text-indigo-600 bg-indigo-600/10 font-medium px-3 py-2 rounded-r-md 
                                flex items-center border border-indigo-600 hover:border-indigo-600/70 hover:bg-indigo-600/10 ease-out 
                                duration-350"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
                
                <ul className="w-full h-auto flex flex-col items-center justify-center gap-y-8">
                    {searchResults.map((result) => (
                            <li key={result._id} className="lg:w-[75%] md:w-full sm:w-full w-full h-auto px-10 lg:py-12
                            md:py-12 sm:py-10 py-10 bg-black/10 rounded-lg border-[6px] border-gray-600
                            hover:border-indigo-600/40 hover:bg-gray-600/10 ease-out duration-600 cursor-pointer">
                                <Link 
                                    to="/calendar">
                                <h3>{result.name}</h3>
                                <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Date: {moment(result.date).format("MMMM Do YYYY")}</p>
                                <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Category: {result.danceCategory}</p>
                                <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Difficulty: {result.studentLevel}</p>
                                <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Capacity: {result.capacity}</p>
                                <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Room: {JSON.stringify(result.classroom)}</p>
                                </Link>
                            </li>
                     ))}
                 </ul>
            </div>    
            </div>

                <CourseSlides />
                <HistoryBanner />

                {/* <UpcomingClasses /> */}

            <div className="w-full h-auto flex flex-col items-center justify-center gap-7 lg:py-16 md:py-14 sm:py-12 py-10
                lg:px-24 md:px-16 sm:px-6 px-4">
                <div className="w-full h-auto flex flex-col items-center justify-center">
                    <h3 className="lg:text-lg md:text-lf sm:text-base text-base font-medium
                        text-gray-200 flex items-center gap-x-2 bg-black/16 rounded-t-md py-2 px-4">
                        <StepForward />
                            Upcoming Classes
                    </h3>
                    <ul className="w-full h-auto flex flex-col items-center justify-center gap-y-8">
                    {userClassHistory.upcomingClasses.map(cls => (
                        <li key={cls._id} className="lg:w-[75%] md:w-full sm:w-full w-full h-auto px-10 lg:py-12
                        md:py-12 sm:py-10 py-10 bg-black/10 rounded-lg border-[6px] border-gray-600
                        hover:border-indigo-600/40 hover:bg-gray-600/10 ease-out duration-600 cursor-pointer"
                        >
                            <h2 className="lg:text-4xl text-3xl text-white font-semibold mb-5">{cls.studentLevel}</h2>
                            <h1 className="text-5xl text-indigo-600 font-bold mb-3 tracking-wide">{cls.danceCategory}</h1>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Date: {moment(cls.startDate).format("MMMM Do YYYY")}</p>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Time: {moment(cls.startDate).format("h:mm A")}</p>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Room: {JSON.stringify(cls.classroom)}</p>
                        </li>
                    ))}
                    </ul>
                </div>    
            </div>

                {/* <PreviousClasses /> */}

            <div className="w-full h-auto flex items-center justify-between gap-7 lg:py-16 md:py-14 sm:py-12 py-10
                lg:px-24 md:px-16 sm:px-6 px-4">
                    <div className="w-full h-auto flex items-center justify-center flex-col">
                        <h3 className="lg:text-lg md:text-lf sm:text-base text-base font-medium
                            text-gray-200 flex items-center gap-x-2 bg-black/16 rounded-t-md py-2 px-4"
                        >
                            <StepBack />
                            Previous Classes
                        </h3>
                    <ul className="w-full h-auto flex flex-col items-center justify-center gap-y-8">
                        {userClassHistory.pastClasses.map(cls => (
                        <li key={cls._id} className="lg:w-[75%] md:w-full sm:w-full w-full h-auto px-10 lg:py-12
                            md:py-12 sm:py-10 py-10 bg-black/10 rounded-lg border-[6px] border-gray-600
                            hover:border-indigo-600/40 hover:bg-gray-600/10 ease-out duration-600 cursor-pointer"
                        >
                            <h2 className="lg:text-4xl text-3xl text-white font-semibold mb-5">{cls.studentLevel}</h2>
                            <h1 className="text-5xl text-indigo-600 font-bold mb-3 tracking-wide">{cls.danceCategory}</h1>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Date: {moment(cls.startDate).format("MMMM Do YYYY")}</p>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Time: {moment(cls.startDate).format("h:mm A")}</p>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Room: {JSON.stringify(cls.classroom)}</p>
                            {/* Rating Feature */}
                            <div className="flex items-center mt-4">
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <label key={rating} className="flex items-center mr-4 text-white lg:text-base md:text-base sm:text-base text-sm">
                                        <input
                                            type="radio"
                                            name={`rating-${cls._id}`}
                                            value={rating}
                                            checked={rating[cls._id] === rating}
                                            onChange={() => handleRatingChange(cls._id, rating)}
                                        />
                                        <span className="ml-2">{rating}</span>
                                    </label>
                                ))}
                            </div>
                            <button className="bg-indigo-600 text-white px-4 py-2 mt-4" onClick={() => handleSubmitRating(cls._id)}>Submit Rating</button>
                        </li>
                        ))}
                    </ul>
                </div>    
            </div>        
                
            </div>
        </>
    )
}

export default Home;