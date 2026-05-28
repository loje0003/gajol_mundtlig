"use client";

import { useState } from "react";
import CardEvent from "./CardEvent";

const EVENTS_PER_PAGE = 3;

const EventPagination = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // AI-værktøj brugt til hjælp med pagination-beregning og udvælgelse af events pr. side
  const totalPages = Math.max(1, Math.ceil(events.length / EVENTS_PER_PAGE));
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const currentEvents = events.slice(startIndex, startIndex + EVENTS_PER_PAGE);

  return (
    <div className="flex flex-col mb-12">
      {currentEvents.map((event, index) => (
        <CardEvent key={event.id} id={event.id} title={event.title} date={event.date} location={event.location} description={event.description} asset={event.asset?.url} schedule={event.schedule} index={index} />
      ))}

      <div className="flex justify-center items-center gap-8 mt-10 text-lg">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={`transition pb-1 ${currentPage === i + 1 ? "border-b border-white" : ""}`}>
            {i + 1}
          </button>
        ))}

        {currentPage < totalPages && <button onClick={() => setCurrentPage(currentPage + 1)}>næste &gt;</button>}
      </div>
    </div>
  );
};

export default EventPagination;
