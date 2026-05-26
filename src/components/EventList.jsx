import EventPagination from "./EventPagination";

const getEvents = async () => {
  const res = await fetch("https://nightclub2026.onrender.com/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
};

const EventList = async () => {
  const events = await getEvents();

  return <EventPagination events={events} />;
};

export default EventList;
