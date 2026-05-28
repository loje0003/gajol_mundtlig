"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

const tracks = [
  {
    title: "Black Box Funky",
    image: "/assets/content-img/track_thumb.jpg",
    audio: "/assets/media/black-box-funky.mp3",
  },
  {
    title: "Euphoria",
    image: "/assets/content-img/track1.jpg",
    audio: "/assets/media/euphoria.mp3",
  },
  {
    title: "Fashion Red Tape",
    image: "/assets/content-img/track2.jpg",
    audio: "/assets/media/fashion-red-tape.mp3",
  },
  {
    title: "You belong with me 1",
    image: "/assets/content-img/track4.jpg",
    audio: "/assets/media/black-box-funky.mp3",
  },
  {
    title: "You belong with me 2",
    image: "/assets/content-img/track5.jpg",
    audio: "/assets/media/euphoria.mp3",
  },
];

function MusicSection() {
  // Vi forsøgte først at styre audio gennem state, men AI hjalp med at identificere at useRef var nødvendigt for at få adgang til audio-elementets play, pause og volume funktioner.

  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const activeTrack = tracks[currentTrack];
  // AI blev brugt til at hjælpe med logikken bag beregningen af progressbaren ud fra sangens længde.
  const progress = duration ? (currentTime / duration) * 100 : 0;

  const playTrack = () => {
    setCurrentTime(0);

    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 100);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const changeTrack = (index) => {
    setCurrentTrack(index);
    playTrack();
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    playTrack();
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    playTrack();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentTrack]);

  // AI blev brugt til at hjælpe med logikken bag omregning af sangens tid til minutter og sekunder.

  const formatTime = (time) => {
    if (!time) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <section>
      <SectionTitle title="night club track" />

      <div className="max-w-6xl mx-auto mt-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-10 items-center">
          <div className="order-6 md:order-1 relative overflow-hidden group w-full max-w-[320px] h-80 mx-auto md:mx-0">
            <Image src={activeTrack.image} alt={activeTrack.title} width={600} height={600} className="w-full h-full object-cover" />

            <div className="absolute inset-0  flex flex-col items-center justify-center opacity-100 md:hidden">
              <div className="absolute top-0 left-0 w-10 h-10 bg-primary-500" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />

              <div className="absolute bottom-0 right-0 w-10 h-10 bg-primary-500" style={{ clipPath: "polygon(100% 100%, 100% 0, 0 100%)" }} />

              <Image src="/assets/icon/Play_btn.svg" alt="Play" width={25} height={25} className="mb-3" />

              <p className="text-sm uppercase text-white">{activeTrack.title}</p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-4xl uppercase mb-10 text-center md:text-left">{activeTrack.title}</h2>

            <div className="relative w-full h-0.75 bg-primary-500/40 mb-6">
              <div className="absolute left-0 top-0 h-full bg-primary-500" style={{ width: `${progress}%` }} />

              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white" style={{ left: `calc(${progress}% - 8px)` }} />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
              <p className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>

              <button onClick={togglePlay} className="w-15 h-15 border-4 border-white rounded-full flex items-center justify-center">
                <Image src="/assets/icon/Play.svg" alt="Play" width={30} height={30} className={isPlaying ? "opacity-50" : ""} />
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue="1"
                onChange={(e) => {
                  if (audioRef.current) {
                    audioRef.current.volume = e.target.value;
                  }
                }}
                className="w-24 accent-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="flex md:hidden justify-center gap-6 mt-8">
          <button onClick={prevTrack} className="w-10 h-10 border flex items-center justify-center">
            <Image src="/assets/icon/Play.svg" alt="Previous" width={12} height={12} className="rotate-180" />
          </button>

          <button onClick={nextTrack} className="w-10 h-10 border flex items-center justify-center">
            <Image src="/assets/icon/Play.svg" alt="Next" width={12} height={12} />
          </button>
        </div>

        <div className="hidden md:grid grid-cols-7 gap-4 mt-12">
          <button onClick={prevTrack} className="w-8 h-8 border flex items-center justify-center">
            <Image src="/assets/icon/Play.svg" alt="Previous" width={12} height={12} className="rotate-180" />
          </button>

          {tracks.map((track, index) => (
            <button key={track.title} onClick={() => changeTrack(index)} className="relative overflow-hidden group">
              <Image src={track.image} alt={track.title} width={300} height={300} className="w-full aspect-square object-cover" />

              <div className={`absolute inset-0 flex flex-col items-center justify-center transition duration-300 ${currentTrack === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <div className="absolute top-0 left-0 w-10 h-10 bg-primary-500" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />

                <div className="absolute bottom-0 right-0 w-10 h-10 bg-primary-500" style={{ clipPath: "polygon(100% 100%, 100% 0, 0 100%)" }} />

                <Image src="/assets/icon/Play_btn.svg" alt="Play" width={25} height={25} className="mb-3" />

                <p className="text-sm uppercase text-white">{track.title}</p>
              </div>
            </button>
          ))}

          <button onClick={nextTrack} className="w-8 h-8 border flex items-center justify-center">
            <Image src="/assets/icon/Play.svg" alt="Next" width={12} height={12} />
          </button>
        </div>

        <audio ref={audioRef} src={activeTrack.audio} />
      </div>
    </section>
  );
}

export default MusicSection;
