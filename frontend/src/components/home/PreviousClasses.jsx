import React from 'react'
import { StepBack } from 'lucide-react'
import axios from 'axios'

const PreviousClasses = () => {
    
    return (
        <div className="w-full h-auto flex items-center justify-between gap-7 lg:py-16 md:py-14 sm:py-12 py-10
         lg:px-24 md:px-16 sm:px-6 px-4">
            <div className="w-full h-auto flex items-center justify-center flex-col">
                <h3 className="lg:text-lg md:text-lf sm:text-base text-base font-medium
                text-gray-200 flex items-center gap-x-2 bg-black/16 rounded-t-md py-2 px-4">
                    <StepBack />
                    Previous Classes
                </h3>
                <div className="w-full h-auto flex flex-col items-center justify-center gap-y-8">
                    <div className="lg:w-[75%] md:w-full sm:w-full w-full h-auto px-10 lg:py-12
                    md:py-12 sm:py-10 py-10 bg-black/10 rounded-lg border-[6px] border-gray-600
                    hover:border-indigo-600/40 hover:bg-gray-600/10 ease-out duration-600 cursor-pointer">
                        <h2 className="lg:text-4xl text-3xl text-white font-semibold mb-5">
                            Intermediate
                        </h2>
                        <h1 className="text-5xl text-indigo-600 font-bold mb-3 tracking-wide">
                            K-pop Fundamentals
                            <span className="lg:text-xl md:text-x1 sm:text-xl text-base text-gray-300 
                            font-medium tracking-normal">
                                With Heeju Kim
                            </span>
                        </h1>
                        <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Date: </p>
                        <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Time: </p>
                        <p className="text-gray-400 lg:text-base md:text-base sm:text-base text-sm">Room: </p>
                    </div>
                </div>
            </div>    
        </div>        
    );
};

export default PreviousClasses;