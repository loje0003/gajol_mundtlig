import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

import BookClient from "./BookClient";

export default async function Book(props) {
  const searchParams = await props.searchParams;

  const eventsRes = await fetch("https://nightclub2026.onrender.com/events", {
    cache: "no-store",
  });

  const reservationsRes = await fetch("https://nightclub2026.onrender.com/reservations", {
    cache: "no-store",
  });

  const events = await eventsRes.json();
  const reservations = await reservationsRes.json();

  return (
    <div>
      <Nav />
      <Hero text="Book table" />

      <BookClient events={events} reservations={reservations} selectedEventId={searchParams?.eventId} />
    </div>
  );
}
