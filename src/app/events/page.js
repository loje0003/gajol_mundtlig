import EventList from "@/components/EventList/EventList";
import Hero from "@/components/Hero";
import Image from "next/image";
import Nav from "@/components/Nav";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const Events = () => {
  return (
    <div>
      <Nav />
      <Hero text="Events" />
      <Suspense fallback={<Loader text="Loading events..." />}>
        <EventList />
      </Suspense>
    </div>
  );
};

export default Events;
