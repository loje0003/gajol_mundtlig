import FeaturedEventsClient from "./FeaturedEventsClient";

async function getEvents() {
  const res = await fetch("https://nightclub2026.onrender.com/events", {
    cache: "no-store",
  });

  const data = await res.json();

  return Array.isArray(data) ? data.slice(0, 6) : [];
}

const FeaturedEvents = async () => {
  const events = await getEvents();

  return <FeaturedEventsClient events={events} />;
};

export default FeaturedEvents;
