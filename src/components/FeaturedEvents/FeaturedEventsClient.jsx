"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";

const FeaturedEventsClient = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const eventsPerPage = isMobile ? 1 : 2;

  const startIndex = currentPage * eventsPerPage;
  const visibleEvents = events.slice(startIndex, startIndex + eventsPerPage);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-center gap-6 px-4">
        {visibleEvents.map((event) => {
          const date = new Date(event.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          const time = event.schedule?.[0]?.time || "";

          const imageSrc = typeof event.heroAsset === "object" ? `https://nightclub2026.onrender.com${event.heroAsset?.url}` : event.heroAsset;

          return (
            <div key={event.id} className="w-full max-w-116.25">
              <div className="relative w-full h-75 md:h-100 overflow-hidden group">
                <Image src={imageSrc} alt={event.title || "event image"} fill className="object-cover transition duration-300 group-hover:scale-110" />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                  <div
                    className="absolute top-0 left-0 w-10 h-10 bg-primary-500"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 0 100%)",
                    }}
                  />

                  <div
                    className="absolute bottom-0 right-0 w-10 h-10 bg-primary-500"
                    style={{
                      clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                    }}
                  />

                  <div className="flex flex-col h-full px-8 py-6">
                    <div className="flex-1" />

                    <div className="flex justify-center mb-6">
                      <Link href={`/book?eventId=${event.id}`}>
                        <Button variant="quaternary" className="w-fit">
                          Book now
                        </Button>
                      </Link>
                    </div>

                    <div className="text-left text-white w-full pb-4">
                      <h3 className="uppercase text-xl mb-2">{event.title}</h3>

                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-pink-500 px-4 py-3 flex justify-between items-center">
                <h3 className="text-sm uppercase">{event.title}</h3>

                <p className="text-sm">
                  {date} · {time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 mt-8">
        {Array.from({ length: totalPages }).map((_, page) => (
          <button key={page} onClick={() => setCurrentPage(page)} className={`w-4 h-4 transition ${currentPage === page ? "bg-pink-500" : "bg-white"}`} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedEventsClient;
