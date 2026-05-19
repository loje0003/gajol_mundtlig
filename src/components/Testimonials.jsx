"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("https://nightclub2026.onrender.com/testimonials");

        const data = await response.json();

        setTestimonials(data);
      } catch (error) {
        console.log("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) {
    return <p className="text-center my-20">Loading...</p>;
  }

  const testimonial = testimonials[currentIndex];
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative w-full h-auto lg:h-180 z-0 my-20">
      <Image src="/assets/bg/footerbg.jpg" alt="background" fill className="object-cover" />

      <div className="absolute inset-0 bg-black/90 z-0" />
      <div className="text-center py-20 px-5 z-10 relative">
        <Image src={`https://nightclub2026.onrender.com${testimonial.asset.url}`} alt={testimonial.asset.alt} width={170} height={170} className="mx-auto" />

        <h3 className="mt-5 text-2xl">{testimonial.name}</h3>

        <p className="text-gray-500 mt-5 mx-auto max-w-[1000px]">{testimonial.content}</p>

        <div className="grid grid-cols-3 gap-5 mt-5 w-35 mx-auto">
          <a href={testimonial.facebook} target="_blank" className="border border-white p-2 flex justify-center">
            <TiSocialFacebook />
          </a>

          <a href={testimonial.twitter} target="_blank" className="border border-white p-2 flex justify-center">
            <FaTwitter />
          </a>

          <div className="border border-white p-2 flex justify-center">
            <FaSnapchatGhost />
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: testimonials.length }).map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-4 h-4 transition ${currentIndex === index ? "bg-pink-500" : "bg-white"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
