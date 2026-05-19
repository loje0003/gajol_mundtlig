"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { x: -120, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Gallery = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const Wrapper = isDesktop ? motion.div : "div";
  const Item = isDesktop ? motion.div : "div";

  const images = [
    { src: "/assets/content-img/gallery1_big.jpg", span: "md:col-span-3" },
    { src: "/assets/content-img/gallery2_big.jpg", span: "md:col-span-3" },
    { src: "/assets/content-img/gallery3_big.jpg", span: "md:col-span-3" },
    { src: "/assets/content-img/gallery4_big.jpg", span: "md:col-span-3" },
    { src: "/assets/content-img/gallery5_big.jpg", span: "md:col-span-4" },
    { src: "/assets/content-img/gallery6_big.jpg", span: "md:col-span-4" },
    { src: "/assets/content-img/gallery7_big.jpg", span: "md:col-span-4" },
  ];

  return (
    <div>
      {/* TITLE */}
      <h2 className="pt-30 text-center text-[25px] uppercase">Night club gallery</h2>

      <Image className="mx-auto" src="/assets/bottom_line2.png" alt="bottom line" width={200} height={20} />

      {/* GRID */}
      <Wrapper
        className="mt-12 mb-12 grid grid-cols-1 md:grid-cols-12 gap-0"
        {...(isDesktop
          ? {
              variants: containerVariants,
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true, amount: 0.2 },
            }
          : {})}
      >
        {images.map((img, index) => (
          <Item key={index} {...(isDesktop ? { variants: itemVariants } : {})} className={`relative overflow-hidden group ${img.span}`}>
            {/* IMAGE */}
            <div className="relative w-full md:h-80 overflow-hidden">
              <Image src={img.src} alt="gallery image" fill className="object-cover transition duration-500 group-hover:scale-110" />
            </div>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 z-10" />

            {/* PINK TRIANGLE TOP LEFT (hover only) */}
            <div
              className="absolute top-0 left-0 w-10 h-10 bg-primary-500 opacity-0 group-hover:opacity-100 transition duration-300 z-20"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
              }}
            />

            {/* PINK TRIANGLE BOTTOM RIGHT (hover only) */}
            <div
              className="absolute bottom-0 right-0 w-10 h-10 bg-primary-500 opacity-0 group-hover:opacity-100 transition duration-300 z-20"
              style={{
                clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
              }}
            />
          </Item>
        ))}
      </Wrapper>
    </div>
  );
};

export default Gallery;
