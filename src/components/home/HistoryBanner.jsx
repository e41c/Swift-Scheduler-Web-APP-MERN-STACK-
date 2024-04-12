import React from 'react'
import BannerArt from '../../assets/HistoryBannerArt.jpg'

function HistoryBanner() {

    return (
        <>
        <div className="w-full h-[35vh] flex items-center justify-center flex-col lg:py-16 md:py-14 sm:py12 py10 lg:px24 md:px-16 sm:px 6 px-4 relative z-10"
            style={{
                backgroundImage: `url(${BannerArt})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
                <div className="w-full h-full bg-black/60 absolute top-0 left-0 -z-10"></div>
                <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-center text-white font-bold mb-2 uppercase">Your Classes</h1>
                <p className="text-[#b9d8eb] font-medium text-center">Something to reminisce & Look Foward to</p>
        </div>
        </>
    )
}

export default HistoryBanner;