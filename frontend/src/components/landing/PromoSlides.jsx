import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Images
import DanceDisplay4 from '../../assets/DanceDisplay_4.jpg';
import DanceDisplay3 from '../../assets/DanceDisplay_3.jpg';
import DanceDisplay1 from '../../assets/DanceDisplay_1.jpg';
import DisplayOriginal from '../../assets/landingp.jpg'

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function PromoSlides() {
    
    return (
        <>
            <div className="w-full h-auto">
            <Swiper
                // install Swiper modules
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                autoplay={{
                    delay:5000,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
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
                        backgroundImage: `url(${DanceDisplay1})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                        <div className="w-full h-full bg-black/70 absoluter top-0 left-0 -z-10">
                        <div className="w-full h-full flex items-center justify-center flex-col z-10
                        lg:px-24 md:px-16 sm:px-6 px-4">
                            <h2 className="lg:text-4xl md:text-3x1 sm:text-2xl text-2xl text-indigo-400 font-semibold mb-2 uppercase">MOVE HOW</h2>
                            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white font-bold mb-2 uppercase">YOU DID IN YOUR DREAMS</h1>
                            <Link 
                                to="./register"
                                className={`text-base text-gray-200 bg-indigo-600 font-medium px-3 py-1.5 rounded gap-x-1 hover:bg-indigo-600/70 ease-out duration-500`}>
                                    Register Now
                            </Link> 
                        </div>
                        </div>
                </SwiperSlide>
                <SwiperSlide
                    className="w-full h-[65vh] relative"
                    style={{
                        backgroundImage: `url(${DanceDisplay4})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                        <div className="w-full h-full bg-black/70 absoluter top-0 left-0 -z-10">
                        <div className="w-full h-full flex items-center justify-center flex-col z-10
                        lg:px-24 md:px-16 sm:px-6 px-4">
                            <h2 className="lg:text-4xl md:text-3x1 sm:text-2xl text-2xl text-indigo-400 font-semibold mb-2 uppercase">Be Inspired</h2>
                            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white font-bold mb-2 uppercase">Believe in yourself</h1>
                            <Link 
                                to="./register"
                                state={{role: "studnet"}}
                                className={`text-base text-gray-200 bg-indigo-600 font-medium px-3 py-1.5 rounded gap-x-1 hover:bg-indigo-600/70 ease-out duration-500`}>
                                    Register Now
                            </Link> 
                            
                        </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide
                    className="w-full h-[65vh] relative"
                    style={{
                        backgroundImage: `url(${DanceDisplay3})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                        <div className="w-full h-full bg-black/70 absoluter top-0 left-0 -z-10">
                        <div className="w-full h-full flex items-center justify-center flex-col z-10
                        lg:px-24 md:px-16 sm:px-6 px-4">
                            <h2 className="lg:text-4xl md:text-3x1 sm:text-2xl text-2xl text-indigo-400 font-semibold mb-2 uppercase">Be Inspired</h2>
                            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white font-bold mb-2 uppercase">Believe in yourself</h1>
                            <Link 
                                to="./register"
                                className={`text-base text-gray-200 bg-indigo-600 font-medium px-3 py-1.5 rounded gap-x-1 hover:bg-indigo-600/70 ease-out duration-500`}>
                                    Register Now
                            </Link> 
                        </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide
                    className="w-full h-[65vh] relative"
                    style={{
                        backgroundImage: `url(${DisplayOriginal})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                        <div className="w-full h-full bg-black/40 absoluter top-0 left-0 -z-10">
                        <div className="w-full h-full flex items-center justify-center flex-col z-10
                        lg:px-24 md:px-16 sm:px-6 px-4">
                            <h2 className="lg:text-4xl md:text-3x1 sm:text-2xl text-2xl text-indigo-400 font-semibold mb-2 uppercase">Take Action</h2>
                            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white font-bold mb-2 uppercase">Reach for the spotlight</h1>
                            <Link 
                                to="./register"
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

export default PromoSlides;