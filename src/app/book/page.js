"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Image from "next/image";
import Button from "@/components/Button";

import { reservationAction } from "./actions";

const initialState = {
  errors: {},
  success: "",
  submitError: "",
};

const tableCapacities = {
  1: 4,
  2: 4,
  3: 6,
  4: 4,
  5: 8,
  6: 4,
  7: 4,
  8: 6,
  9: 4,
  10: 8,
  11: 4,
  12: 4,
  13: 6,
  14: 4,
  15: 8,
};

const tableImages = ["/assets/table/table_1.png", "/assets/table/table_1.png", "/assets/table/table_2.png", "/assets/table/table_1.png", "/assets/table/table_3.png", "/assets/table/table_1.png", "/assets/table/table_1.png", "/assets/table/table_2.png", "/assets/table/table_1.png", "/assets/table/table_3.png", "/assets/table/table_1.png", "/assets/table/table_1.png", "/assets/table/table_2.png", "/assets/table/table_1.png", "/assets/table/table_3.png"];

export default function Book() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reservedTables, setReservedTables] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    table: "",
    guests: "",
    phone: "",
    comment: "",
  });

  const [state, formAction, pending] = useActionState(reservationAction, initialState);

  useEffect(() => {
    fetch("https://nightclub2026.onrender.com/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  const getEventIdFromUrl = () => {
    if (typeof window === "undefined") return null;

    const params = new URLSearchParams(window.location.search);
    return params.get("eventId");
  };

  const fetchReservations = async (eventDate) => {
    const res = await fetch("https://nightclub2026.onrender.com/reservations");
    const data = await res.json();

    const filtered = data.filter((r) => new Date(r.date).toDateString() === new Date(eventDate).toDateString());

    setReservedTables(filtered.map((r) => String(r.table)));
  };

  const applyEvent = (event) => {
    if (!event) return;

    setSelectedEvent(event);
    fetchReservations(event.date);

    window.history.replaceState(null, "", `/book?eventId=${event.id}`);
  };

  useEffect(() => {
    if (events.length === 0) return;

    const id = getEventIdFromUrl();
    if (!id) return;

    const found = events.find((e) => String(e.id) === String(id));

    if (found) {
      applyEvent(found);
    }
  }, [events]);

  const handleSelectTable = (tableNumber) => {
    if (reservedTables.includes(String(tableNumber))) return;

    setFormData((prev) => ({
      ...prev,
      table: String(tableNumber),
    }));
  };

  const handleEventChange = (e) => {
    const event = events.find((ev) => String(ev.id) === e.target.value);

    applyEvent(event);
  };

  return (
    <div>
      <Nav />
      <Hero text="Book table" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-20 mx-30">
        {tableImages.map((src, index) => {
          const tableNumber = String(index + 1);

          const isReserved = reservedTables.includes(tableNumber);
          const isSelected = formData.table === tableNumber;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectTable(tableNumber)}
              disabled={isReserved}
              className={`
                relative flex items-center justify-center
                ${isReserved ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                ${isSelected ? "scale-110 transition" : ""}
              `}
            >
              <Image src={src} alt={`table ${tableNumber}`} width={200} height={20} />
              <span className="absolute font-bold text-m">{tableNumber}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 mx-5 md:mt-20 md:mx-30">
        <h2 className="uppercase text-2xl font-bold">Book a Table</h2>

        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <input type="hidden" name="eventId" value={selectedEvent?.id || ""} />

          <div>
            <input
              name="name"
              placeholder="Your Name"
              className="w-full border px-5 py-5 text-white bg-black
      focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            />
            {state.errors?.name && <p>{state.errors.name}</p>}
          </div>

          <div>
            <input
              name="email"
              placeholder="Your Email"
              className="w-full border px-5 py-5 text-white bg-black
      focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            />
            {state.errors?.email && <p>{state.errors.email}</p>}
          </div>

          <div>
            <input
              name="table"
              value={formData.table}
              readOnly
              placeholder="Table Number"
              className="w-full border px-5 py-5 text-white bg-black
      focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            />
            {state.errors?.table && <p>{state.errors.table}</p>}
          </div>

          <div>
            <input
              name="guests"
              placeholder="Number of Guests"
              className="w-full border px-5 py-5 text-white bg-black
      focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            />
            {state.errors?.guests && <p>{state.errors.guests}</p>}
          </div>

          <div>
            <select
              value={selectedEvent ? String(selectedEvent.id) : ""}
              onChange={handleEventChange}
              className="w-full border px-5 py-5 text-white bg-black
      focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            >
              <option value="" disabled>
                Choose a night
              </option>

              {events.map((event) => (
                <option key={event.id} value={String(event.id)}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone"
              className="w-full border px-5 py-5 text-white bg-black
      focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            />
            {state.errors?.phone && <p>{state.errors.phone}</p>}
          </div>

          <div className="md:col-span-2">
            <textarea
              name="comment"
              placeholder="Comment"
              className="w-full border px-5 py-5 text-white bg-black
      focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            />
          </div>

          {state.success && <p className="text-green-500">{state.success}</p>}

          {state.submitError && <p className="text-pink-500">{state.submitError}</p>}

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={pending}>
              {pending ? "RESERVING..." : "RESERVE"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
