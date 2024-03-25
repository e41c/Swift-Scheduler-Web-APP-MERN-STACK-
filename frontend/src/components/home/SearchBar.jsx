import { useState } from 'react'
import { Search } from 'lucide-react'
import axios from 'axios'

const SearchBar = () => {
    
    //Function to set search
    const [search, setSearch] = useState("");
    
    return (
        <form className="w-full h-auto flex items-center justify-between gap-7 lg:py-16 md:py-14 sm:py-12 py-10
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
                        />
                    </div>
                    <div className="w-1/5 justify-center"> 
                        <button 
                            className="w-full text-base text-indigo-600 bg-indigo-600/10 font-medium px-3 py-2 rounded-r-md 
                                flex items-center border border-indigo-600 hover:border-indigo-600/70 hover:bg-indigo-600/10 ease-out 
                                duration-350"
                            type="submit"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>    
        </form>
    );
};

export default SearchBar;