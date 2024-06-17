import React, { useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation';
import AnimatedHamburgerButton from './HamburgerBtn';

export default function MobileNavbar() {
  const links = [
    { path: '#home', name: 'Home' },
    { path: '#about', name: 'About' },
    { path: '#services', name: 'Services' },
    { path: '#projects', name: 'Projects' },
    { path: '#contact', name: 'Contact' },
  ];
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const MotionLink = motion(Link);

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

  const xValues = links.map(() => useMotionValue(0));
  const yValues = links.map(() => useMotionValue(0));
  const textXValues = xValues.map((x) =>
    useTransform(x, (latest) => latest * 0.5)
  );
  const textYValues = yValues.map((y) =>
    useTransform(y, (latest) => latest * 0.5)
  );

  const modalVariants = {
    hidden: {
      y: '-100vh',
    },
    visible: {
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
    exit: {
      y: '-100vh',
      transition: {
        type: 'tween',
        duration: 0.3,
        delay: 0.3,
      },
    },
  };

  const navLinksVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <>
      <nav className="sticky flex items-center justify-between p-8">
        <div>
          <span className="self-center whitespace-nowrap text-xl font-semibold text-purple-500 dark:text-white">
            <p>Web Dev</p>
          </span>
        </div>
        <div className="z-10">
          <AnimatedHamburgerButton active={active} setActive={setActive} />
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-gray-900"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="relative w-full bg-gray-900"
                variants={navLinksVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex h-full flex-col items-center justify-center gap-8">
                  <AnimatePresence>
                    {links.map((link, index) => (
                      <motion.li
                        key={link.path}
                        onPointerMove={(event) => {
                          const item = event.currentTarget as HTMLElement;
                          setTransform(
                            item,
                            event,
                            xValues[index],
                            yValues[index]
                          );
                        }}
                        onPointerLeave={(event) => {
                          xValues[index].set(0);
                          yValues[index].set(0);
                        }}
                        style={{ x: xValues[index], y: yValues[index] }}
                      >
                        <MotionLink
                          className={cn(
                            'relative rounded-md px-4 py-2 text-lg font-medium text-white transition-all duration-500 ease-out hover:bg-sky-200 hover:text-black',
                            pathname === link.path ? 'bg-sky-200' : ''
                          )}
                          href={link.path}
                        >
                          <motion.span
                            style={{
                              x: textXValues[index],
                              y: textYValues[index],
                            }}
                            className="relative z-10"
                          >
                            {link.name}
                          </motion.span>
                          {pathname === link.path && (
                            <motion.div
                              transition={{ type: 'spring' }}
                              layoutId="underline"
                              className="absolute bottom-0 left-0 h-full w-full rounded-md bg-sky-400"
                            ></motion.div>
                          )}
                        </MotionLink>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}