"use client";

import { useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

const videos = ["/assets/media/video-crowd.mp4", "/assets/media/video-dj-crowd-2.mp4", "/assets/media/video-dj-crowd1.mp4"];

const VideoSection = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="w-full flex flex-col items-center gap-6">
      <SectionTitle title="featured videos" />

      <div className="relative w-full max-w-5xl h-105 overflow-hidden">
        <video src={videos[current]} className="w-full h-full object-cover" controls />

        <div
          className="absolute top-0 left-0 w-15 h-15 bg-primary-500"
          style={{
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />

        <div
          className="absolute bottom-0 right-0 w-15 h-15 bg-primary-500"
          style={{
            clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setCurrent((prev) => (prev === 0 ? videos.length - 1 : prev - 1))} className="w-8 h-8 border flex items-center justify-center">
          <Image src="/assets/icon/Play.svg" alt="Previous" width={12} height={12} className="rotate-180" />
        </button>

        <button onClick={() => setCurrent((prev) => (prev === videos.length - 1 ? 0 : prev + 1))} className="w-8 h-8 border flex items-center justify-center">
          <Image src="/assets/icon/Play.svg" alt="Next" width={12} height={12} />
        </button>
      </div>
    </section>
  );
};

export default VideoSection;
