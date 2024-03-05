import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Images
import DanceDisplay2 from '../assets/DanceDisplay_2.jpg';
import DanceDisplay5 from '../assets/DanceDisplay_5.jpg';
import DanceDisplay6 from '../assets/DanceDisplay_6.jpg';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function CourseSlides() {
    
    return (
        <>
            <div className="w-full h-auto">
            <Swiper
                // install Swiper modules
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 2600,
                    disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                className="mySwiper w-full h-auto"
            >
                <SwiperSlide
                    className="w-full h-[65vh] relative"
                    style={{
                        backgroundImage: `url(${DanceDisplay2})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                        <div className="w-full h-full bg-black/70 absoluter top-0 left-0 -z-10">
                        <div className="w-full h-full flex items-center justify-center flex-col z-10
                        lg:px-24 md:px-16 sm:px-6 px-4">
                            <h2 className="lg:text-3xl md:text-3x1 sm:text-2xl text-2xl text-indigo-400 font-semibold mb-2 uppercase">beginner</h2>
                            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white font-bold mb-2 uppercase">Hip Hop essentials</h1>
                            <p className="text-[#b9d8eb] font-medium text-center">With Heeju Kim</p>
                            <Link 
                                to="./home"
                                className={`text-base text-gray-200 bg-indigo-600 font-medium px-3 py-1.5 rounded gap-x-1 hover:bg-indigo-600/70 ease-out duration-500`}>
                                    Register Now
                            </Link> 
                        </div>
                        </div>
                </SwiperSlide>
                <SwiperSlide
                    className="w-full h-[65vh] relative"
                    style={{
                        backgroundImage: `url(${DanceDisplay5})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                        <div className="w-full h-full bg-black/70 absoluter top-0 left-0 -z-10">
                        <div className="w-full h-full flex items-center justify-center flex-col z-10
                        lg:px-24 md:px-16 sm:px-6 px-4">
                            <h2 className="lg:text-4xl md:text-3x1 sm:text-2xl text-2xl text-indigo-400 font-semibold mb-2 uppercase">Intermediate</h2>
                            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white font-bold mb-2 uppercase">Crumping & Lockin</h1>
                            <p className="text-[#b9d8eb] font-medium text-center">With Mike Ventura</p>
                            <Link 
                                to="./home"
                                className={`text-base text-gray-200 bg-indigo-600 font-medium px-3 py-1.5 rounded gap-x-1 hover:bg-indigo-600/70 ease-out duration-500`}>
                                    Register Now
                            </Link> 
                        </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide
                    className="w-full h-[65vh] relative"
                    style={{
                        backgroundImage: `url(${DanceDisplay6})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                        <div className="w-full h-full bg-black/70 absoluter top-0 left-0 -z-10">
                        <div className="w-full h-full flex items-center justify-center flex-col z-10
                        lg:px-24 md:px-16 sm:px-6 px-4">
                            <h2 className="lg:text-3xl md:text-3x1 sm:text-2xl text-2xl text-indigo-400 font-semibold mb-2 uppercase">Advance</h2>
                            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white font-bold mb-2 uppercase">Advanced K-pop</h1>
                            <p className="text-[#b9d8eb] font-medium text-center">With Selina Kyle</p>
                            <Link 
                                to="./home"
                                className={`text-base text-gray-200 bg-indigo-600 font-medium px-3 py-1.5 rounded gap-x-1 hover:bg-indigo-600/70 ease-out duration-500`}>
                                    Register Now
                            </Link> 
                        </div>
                        </div>
                    </SwiperSlide>
            </Swiper>
            <div className="w-full h-auto flex items-center justify-center lg:justify-between md:justify-between sm:justify-center gap-5 lg:px-24 md-px-16 sm:px-6 px-6 mt-6 flex-wrap">
                <div className="flex-col lg:w-fit md:w-[45%] sm:w-[45%] w-full lg:py-6 md:py-7 sm:py-8 py-9 px-10 bg-black/10 text-left"> {/* Add text-left class here */}
                    <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl text-indigo-400 font-kaushan mb-2 uppercase">Powered By</h2>
                    <h1 className="lg:text-8xl md:text-4xl sm:text-3xl text-2xl text-white font-bold mb-2 uppercase">Swift</h1>
                    <h1 className="lg:text-8xl md:text-4xl sm:text-3xl text-2xl text-white font-bold mb-2 uppercase">Scheduler</h1>
                </div>
                    <CalendarDays className="w-[25vw] h-[20vh] text-white" />
            </div>
            </div>
        </>
    )
}

export default CourseSlides;