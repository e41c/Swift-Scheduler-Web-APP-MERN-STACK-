import React from 'react'
import BannerArt from '../assets/WelcomeBannerArt.jpg'

function Banner() {
    return (
        <>
        <div className="w-full h-[35vh] flex items-center justify-center flex-col lg:py-16 md:py-14 sm:py12 py10 lg:px24 md:px-16 sm:px 6 px-4 relative z-10"
            style={{
                backgroundImage: `url(${BannerArt})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
                <div className="w-full h-full bg-black/40 absolute top-0 left-0 -z-10"></div>
                <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-center text-white font-bold mb-2 uppercase">Welcome Member</h1>
                <p className="text-[#b9d8eb] font-medium text-center">Find the perfect plan & instructor for you!</p>
        </div>
        <div className="w-full h-auto flex items-center lg:justify-between md:justify-between sm:justify-center justify-center lg:gap-7 md:gap-7 sm:gap-5 gap-5 lg:px-24 md:px-16 sm:px-6 px-6 mt-6 flex-wrap">
            <div className="flex items-center justify-center flex-col lg:w-fit md:w-[45%] sm:w-[45%] w-full lg:py-6 md:py-7 sm:py8 py-9 px-10 bg-black/10 hover:bg-black/40 rounded-md ease-out duration-600 cursor-pointer">
                <h3 className="text-4xl text-indigo-400 font-semibold mb-2 uppercase">1000+</h3>
                <p className="text-[#b9d8eb] font-medium text-center">Students</p>
            </div>
            <div className="flex items-center justify-center flex-col lg:w-fit md:w-[45%] sm:w-[45%] w-full lg:py-6 md:py-7 sm:py8 py-9 px-10 bg-black/10 hover:bg-black/40 rounded-md ease-out duration-600 cursor-pointer">
                <h3 className="text-4xl text-indigo-400 font-semibold mb-2 uppercase">200+</h3>
                <p className="text-[#b9d8eb] font-medium text-center">Courses</p>
            </div>
            <div className="flex items-center justify-center flex-col lg:w-fit md:w-[45%] sm:w-[45%] w-full lg:py-6 md:py-7 sm:py8 py-9 px-10 bg-black/10 hover:bg-black/40 rounded-md ease-out duration-600 cursor-pointer">
                <h3 className="text-4xl text-indigo-400 font-semibold mb-2 uppercase">65+</h3>
                <p className="text-[#b9d8eb] font-medium text-center">Instructors</p>
            </div>
            <div className="flex items-center justify-center flex-col lg:w-fit md:w-[45%] sm:w-[45%] w-full lg:py-6 md:py-7 sm:py8 py-9 px-10 bg-black/10 hover:bg-black/40 rounded-md ease-out duration-600 cursor-pointer">
                <h3 className="text-4xl text-indigo-400 font-semibold mb-2 uppercase">3</h3>
                <p className="text-[#b9d8eb] font-medium text-center">Studio Locations</p>
            </div>
        </div>
        </>
    )
}

export default Banner;