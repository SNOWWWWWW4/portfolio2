import React from 'react';
import { MotionValue, motion, useTransform } from 'framer-motion';
import { IoLogoCss3, IoLogoJavascript, IoLogoVercel } from 'react-icons/io5';
import { BiLogoTypescript } from 'react-icons/bi';
import { TbBrandNextjs } from 'react-icons/tb';
import { IconContext } from 'react-icons';
import {
  SiCsharp,
  SiDotnet,
  SiJira,
  SiMicrosoftazure,
  SiMicrosoftsqlserver,
  SiNotion,
  SiPostman,
  SiTailwindcss,
  SiVisualstudiocode,
} from 'react-icons/si';
import {
  FaBootstrap,
  FaFigma,
  FaGithub,
  FaHtml5,
  FaLinkedin,
  FaReact,
  FaSlack,
} from 'react-icons/fa6';
import MagnetEffect from './ui/magnet-effect';



const About = ({scrollYProgress} : {scrollYProgress: MotionValue<number>}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const gridSquareVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.section
      id="about"
      className="mx-auto px-4 pb-20 pt-24 sm:px-6 md:mt-0 lg:px-8 z-10 bg-red-400 min-h-screen relative"
      style={{ scale, rotate }}
    >
     <h1 className='text-white'>Hello animations are cool</h1>
    </motion.section>
  )
}

export default About
