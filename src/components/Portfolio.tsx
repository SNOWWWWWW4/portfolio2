'use client'
import React, { useEffect, useRef } from 'react'
import useWindowSize from '@/hooks/useWindowSize';
import Footer from './Footer';
import Hero from './Hero';
import DesktopNavbar from './nav/DesktopNav';
import MobileNavbar from './nav/MobileNav';
import About from './About';
import Contact from './Contact';
import Info from './Info';
import Lenis from 'lenis'
import { useScroll } from 'framer-motion';


//bg-[#101034]

const Portfolio = () => {
    const { width } = useWindowSize();
    const isDesktop = width && width >= 767;

    const container = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end end']
    })

    useEffect( () => {

const lenis = new Lenis()



function raf(time: number) {

    lenis.raf(time)

    requestAnimationFrame(raf)

}



requestAnimationFrame(raf)

}, [])
    
  return (
    <main ref={container} className='h-[200vh] relative'>
        {isDesktop? <DesktopNavbar/> : <MobileNavbar />}
      
        <Hero scrollYProgress={scrollYProgress} />
        
        <About scrollYProgress={scrollYProgress }/>
        
        {/* <Info />
        <Contact /> */}
     
        <Footer />
    </main>
  );
}

export default Portfolio
