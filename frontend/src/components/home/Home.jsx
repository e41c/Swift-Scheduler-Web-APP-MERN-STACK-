import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CourseSlides from './CourseSlides'
import WelcomeBanner from './WelcomeBanner'
import SearchBar from './SearchBar'
import HistoryBanner from './HistoryBanner'
import UpcomingClasses from './UpcomingClasses'
import PreviousClasses from './PreviousClasses'

function Home() {
    return (
        <>
            <div className="w-full h-auto">
                <WelcomeBanner />
                <SearchBar />
                <CourseSlides />
                <HistoryBanner />
                <UpcomingClasses />
                <PreviousClasses />
            </div>
        </>
    )
}

export default Home;