import { Suspense } from "react";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import BookClient from "./BookClient";

async function BookContent({ searchParams }) {
  const params = await searchParams;

  const eventsRes = await fetch("https://nightclub2026.onrender.com/events", {
    cache: "no-store",
  });

  const reservationsRes = await fetch("https://nightclub2026.onrender.com/reservations", {
    cache: "no-store",
  });

  const events = await eventsRes.json();
  const reservations = await reservationsRes.json();

  return <BookClient events={events} reservations={reservations} selectedEventId={params.eventId} />;
}

export default function Book({ searchParams }) {
  return (
    <>
      <Nav />
      <Hero text="Book Table" />

      <Suspense fallback={<p className="p-10 text-center">Loading booking...</p>}>
        <BookContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
