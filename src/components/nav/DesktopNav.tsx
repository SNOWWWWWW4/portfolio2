'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from 'framer-motion';

interface LinkItem {
  path: string;
  name: string;
}

interface NavbarLinkProps {
  link: LinkItem;
  pathname: string;
}

const MotionLink = motion(Link);

const NavbarLink: React.FC<NavbarLinkProps> = ({ link, pathname }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useTransform(x, (latest) => latest * 0.5);
  const textY = useTransform(y, (latest) => latest * 0.5);

  const mapRange = (
    inputLower: number,
    inputUpper: number,
    outputLower: number,
    outputUpper: number
  ) => {
    const INPUT_RANGE = inputUpper - inputLower;
    const OUTPUT_RANGE = outputUpper - outputLower;

    return (value: number) =>
      outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
  };

  const setTransform = (
    item: HTMLElement,
    event: React.PointerEvent,
    x: MotionValue<number>,
    y: MotionValue<number>
  ) => {
    const bounds = item.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
    const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
    x.set(xRange * 10);
    y.set(yRange * 10);
  };

  return (
    <motion.li
      onPointerMove={(event) => {
        const item = event.currentTarget as HTMLElement;
        setTransform(item, event, x, y);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
    >
      <MotionLink
        className={cn(
          'relative rounded-md px-4 py-2 text-sm text-white font-medium transition-all duration-500 ease-out hover:bg-sky-500',
          pathname === link.path ? 'bg-sky-200' : ''
        )}
        href={link.path}
      >
        <motion.span style={{ x: textX, y: textY }} className='relative z-10'>
          {link.name}
        </motion.span>
        {pathname === link.path ? (
          <motion.div
            transition={{ type: 'spring' }}
            layoutId='underline'
            className='absolute bottom-0 left-0 h-full w-full rounded-md bg-sky-400'
          ></motion.div>
        ) : null}
      </MotionLink>
    </motion.li>
  );
};

const DesktopNavbar = () => {
  const links: LinkItem[] = [
    { path: '#home', name: 'Home' },
    { path: '#about', name: 'About' },
    // { path: '#services', name: 'Services' },
    { path: '#projects', name: 'Projects' },
    { path: '#contact', name: 'Contact' },
  ];

  const pathname = usePathname();

  return (
    <nav className='top-0 z-20 flex items-center justify-between p-4 bg-gray-900'>
      <div>
        <span className='self-center whitespace-nowrap text-xl font-semibold text-purple-500 '>
          <a href='https://github.com/SNOWWWWWW4'>Web Dev</a>
        </span>
      </div>
      <ul className='hidden md:flex md:gap-12'>
        <AnimatePresence>
          {links.map((link) => (
            <NavbarLink key={link.path} link={link} pathname={pathname} />
          ))}
        </AnimatePresence>
      </ul>
    </nav>
  );
};

export default DesktopNavbar;
