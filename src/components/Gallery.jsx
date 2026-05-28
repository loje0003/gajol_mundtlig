"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";

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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // AI-assisteret: animationer er kun aktiveret på desktop
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
      <h2 className="pt-30 text-center text-[25px] uppercase">Night club gallery</h2>

      <Image className="mx-auto" src="/assets/bottom_line2.png" alt="bottom line" width={200} height={20} />

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
          <Item
            key={index}
            {...(isDesktop ? { variants: itemVariants } : {})}
            className={`relative overflow-hidden group ${isDesktop ? "cursor-pointer" : "cursor-default"} ${img.span}`}
            {...(isDesktop
              ? {
                  onClick: () => setSelectedImage(img.src),
                }
              : {})}
          >
            <div className="relative w-full aspect-4/3 md:h-80 overflow-hidden">
              <Image src={img.src} alt="gallery image" fill className="object-cover transition duration-500 group-hover:scale-110" />
            </div>

            {/* AI + design tokens */}
            <div className="absolute inset-0 bg-black-50 opacity-0 group-hover:opacity-100 transition duration-300 z-10" />

            <div
              className="absolute top-0 left-0 w-10 h-10 bg-primary-500 opacity-0 group-hover:opacity-100 transition duration-300 z-20"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
              }}
            />

            <div
              className="absolute bottom-0 right-0 w-10 h-10 bg-primary-500 opacity-0 group-hover:opacity-100 transition duration-300 z-20"
              style={{
                clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
              }}
            />
          </Item>
        ))}
      </Wrapper>

      {selectedImage && (
        <div className="fixed inset-0 bg-black-85 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => {
                const currentIndex = images.findIndex((img) => img.src === prev);
                const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
                return images[newIndex].src;
              });
            }}
            className="absolute left-4 md:left-10 w-10 h-10 bg-black-70 border flex items-center justify-center z-50"
          >
            <Image src="/assets/icon/Play.svg" alt="Previous" width={14} height={14} className="rotate-180" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => {
                const currentIndex = images.findIndex((img) => img.src === prev);
                const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
                return images[newIndex].src;
              });
            }}
            className="absolute right-4 md:right-10 w-10 h-10 bg-black-70 border flex items-center justify-center z-50"
          >
            <Image src="/assets/icon/Play.svg" alt="Next" width={14} height={14} />
          </button>

          <div className="max-w-4xl w-full overflow-hidden max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[50vh] md:h-105 min-h-75">
              <Image src={selectedImage} alt="Selected image" fill className="object-cover" />
            </div>

            <div className="px-6 md:px-10 py-6 md:py-10">
              <h3 className="text-lg uppercase mb-4">Night club party</h3>

              <p className="text-gray-500 leading-7 mb-6">here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>

              <Link href="/events">
                <Button variant="primary">Read more</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
