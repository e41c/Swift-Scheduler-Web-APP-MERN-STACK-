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
    const [searchResults, setSearchResults] = useState([]);
    const {userClassHistory} = useClassContext();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/classes/filter/byAttributes?danceCategory=${search}`,{headers: {Authorization: `Bearer ${auth.token}`}});
            setSearchResults(response.data);
            console.log("Search Results", response.data);
        } catch (error) {
            console.log("Opps! an error has occured while searching classes", error);
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
                                <h3>{result.name}</h3>
                                <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Date: {moment(result.date).format("MMMM Do YYYY")}</p>
                                <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Category: {result.danceCategory}</p>
                                <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Difficulty: {result.studentLevel}</p>
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
                            <h2 className="lg:text-4xl text-3xl text-white font-semibold mb-5">{cls.difficulty}</h2>
                            <h1 className="text-5xl text-indigo-600 font-bold mb-3 tracking-wide">{cls.name}</h1>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Date: {moment(cls.startDate).format("MMMM Do YYYY")}</p>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Time: {moment(cls.startDate).format("h:mm A")}</p>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Room: {cls.classroom}</p>
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
                            <h2 className="lg:text-4xl text-3xl text-white font-semibold mb-5">{cls.difficulty}</h2>
                            <h1 className="text-5xl text-indigo-600 font-bold mb-3 tracking-wide">{cls.name}</h1>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Date: {moment(cls.startDate).format("MMMM Do YYYY")}</p>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Time: {moment(cls.startDate).format("h:mm A")}</p>
                            <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Room: {cls.classroom}</p>
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