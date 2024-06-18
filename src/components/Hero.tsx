import { MotionValue, motion, useTransform } from 'framer-motion';
import React from 'react';
import { Highlight } from './ui/hero-highlight';
import { LampContainer } from './ui/lamp';
import useWindowSize from '@/hooks/useWindowSize';

const Hero = ({scrollYProgress} : {scrollYProgress: MotionValue<number>}) => {
    const { width } = useWindowSize();
    const isDesktop = width && width >= 767;

    const scale = useTransform(scrollYProgress, [0, 1], [1,0.8])
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5])

  return (
    <motion.section
        id='home'
        className={isDesktop ? 'h-[calc(100vh-68px)] sticky top-0' : 'h-[calc(100dvh-96px)]'}
        style={{scale, rotate}}
    >
      <LampContainer>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className='mx-auto max-w-7xl bg-gradient-to-br from-slate-200 to-slate-500 bg-clip-text p-4 py-4 text-center text-2xl font-bold leading-relaxed text-white shadow-2xl shadow-black/50 md:text-4xl lg:text-5xl lg:leading-snug'
        >
          I&apos;m Liam Garcia, a Front-End Web Developer, passionate about
          crafting immersive digital experiences through{' '}
          {/* <Highlight className="text-black dark:text-white">
            clean and elegant code.
          </Highlight> */}
          clean and elegant code.
        </motion.h1>
      </LampContainer>
    </motion.section>
  );
};

export default Hero;
