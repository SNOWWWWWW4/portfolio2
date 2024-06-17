'use client'
import React from 'react'
import useWindowSize from '@/hooks/useWindowSize';
import Footer from './Footer';
import Hero from './Hero';
import DesktopNavbar from './nav/DesktopNav';
import MobileNavbar from './nav/MobileNav';


//bg-[#101034]

const Portfolio = () => {
    const { width } = useWindowSize();
    const isDesktop = width && width >= 767;
  return (
    <main className='min-h-screen bg-[#090923] scroll-smooth rounded-bl-3xl rounded-br-3xl'>
        {isDesktop? <DesktopNavbar/> : <MobileNavbar />}
      <section
        id='home'
        className={isDesktop ? 'h-[calc(100vh-68px)]' : 'h-[calc(100dvh-96px)]'}
      >
        <Hero />
      </section>
      <section>
        
      </section>
      <Footer />
    </main>
  );
}

export default Portfolio
