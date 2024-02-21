import { React, useState } from 'react'
import GrooveZoneBanner from '../../assets/landingp.jpg';
import SwiftScheduler from '../../assets/SwiftSchedulerLogo.png';

function LandingPage() {
    
    return (
        <main class="main">
            <section class="home section" id="home">
                <div class="home__container container grid">
                    <div class="home__data">
                        <h2 class="home__subtitle">MOVE LIKE</h2>
                        <h1 class="home__title">YOU DID IN YOUR DREAMS</h1>
                        <p class="home__description">
                            Its never to late to move your body the way you want!
                            Come join us and move like never before!
                        </p>
                        <a href="./register" class="button button__flex">
                            Register Now!
                        </a>
                    </div>
                    <div class="home__images">
                        <img src={GrooveZoneBanner} alt="groove zone banner art" class="home__img" />

                        <div class="home__triangle home__triangle-1"></div>
                        <div class="home__triangle home__triangle-2"></div>
                    </div>

                    <div class="home__images">
                        <img src={SwiftScheduler} alt="Swift Scheduler Logo"/>
                    </div>
                </div>
            </section>
            <section class="about section" id="about">
                <div class="about__data">
                    <h1>About Us</h1>
                </div>
            </section>
        </main>         
    )
}

export default LandingPage