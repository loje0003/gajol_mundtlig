"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Header = () => {
  const backgrounds = ["/assets/bg/header_bg_1.jpg", "/assets/bg/header_bg_2.jpg"];
  const [randomBg, setRandomBg] = useState(backgrounds[0]);

  useEffect(() => {
    const index = Math.floor(Math.random() * backgrounds.length);
    setRandomBg(backgrounds[index]);
  }, []);

  const fadeSlide = {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-150">
      <Image src={randomBg} alt="background" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <motion.div
          initial={{ opacity: 0, rotateX: 100, y: -100 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{
            duration: 3.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformPerspective: 1000 }}
        >
          <Image src="/assets/icon/Logo.svg" alt="logo" width={700} height={30} />
        </motion.div>

        <motion.h3 variants={fadeSlide} initial="hidden" animate="show" transition={{ duration: 0.8, delay: 1.2 }} className="text-[15px] tracking-[1em] md:text-[30px] md:tracking-[0.65em] uppercase text-center">
          have a good time
        </motion.h3>

        <motion.div variants={fadeSlide} initial="hidden" animate="show" transition={{ duration: 0.8, delay: 1.2 }}>
          <Image src="/assets/bottom_line.png" alt="bottom line" width={500} height={30} />
        </motion.div>

        <motion.div variants={fadeSlide} initial="hidden" animate="show" transition={{ duration: 0.8, delay: 1.2 }} className="grid grid-cols-2 gap-5 mt-5">
          <Link href="/events">
            <Button variant="secondary">View event</Button>
          </Link>

          <Link href="/book">
            <Button variant="tertiary">Book table</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
