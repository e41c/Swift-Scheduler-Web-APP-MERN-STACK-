import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CourseSlides from './CourseSlides'
import WelcomeBanner from './WelcomeBanner'

function Home() {
    return (
        <>
            <div className="w-full h-auto">
                <WelcomeBanner />
                <CourseSlides />
            </div>
        </>
    )
}

export default Home;