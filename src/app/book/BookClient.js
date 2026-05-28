"use client";
// AI-assisteret hjælp (inspireret af Next.js Forms guide):
// Bruges som støtte til event selection, bordvalg og form submission.

import { useMemo, useState } from "react";
import { useActionState } from "react";

import Image from "next/image";

import Button from "@/components/Button";

import { reservationAction } from "./actions";

const initialState = {
  errors: {},
  success: "",
  submitError: "",
};

const tableImages = ["/assets/table/table_1.png", "/assets/table/table_1.png", "/assets/table/table_2.png", "/assets/table/table_1.png", "/assets/table/table_3.png", "/assets/table/table_1.png", "/assets/table/table_1.png", "/assets/table/table_2.png", "/assets/table/table_1.png", "/assets/table/table_3.png", "/assets/table/table_1.png", "/assets/table/table_1.png", "/assets/table/table_2.png", "/assets/table/table_1.png", "/assets/table/table_3.png"];

export default function BookClient({ events, reservations, selectedEventId }) {
  // AI assistance: hjælp til at finde det valgte event fra URL (selectedEventId) i events-arrayet og sikre korrekt sammenligning af id'er
  const initialEvent = events.find((e) => String(e.id) === String(selectedEventId)) || null;

  const [selectedEvent, setSelectedEvent] = useState(initialEvent);

  const [formData, setFormData] = useState({
    table: "",
  });

  const [state, formAction, pending] = useActionState(reservationAction, initialState);

  // AI har hjulpet med at strukturere useMemo til at filtrere reserverede borde pr. event/dato
  const reservedTables = useMemo(() => {
    if (!selectedEvent) return [];

    return reservations.filter((r) => new Date(r.date).toDateString() === new Date(selectedEvent.date).toDateString()).map((r) => String(r.table));
  }, [reservations, selectedEvent]);

  // AI har hjulpet med logik til klikbart grid + selected state håndtering
  const handleSelectTable = (tableNumber) => {
    if (reservedTables.includes(tableNumber)) return;

    setFormData((prev) => ({
      ...prev,
      table: tableNumber,
    }));
  };

  // AI har hjulpet med event switch + opdatering af URL uden reload
  const handleEventChange = (e) => {
    const event = events.find((ev) => String(ev.id) === e.target.value);

    setSelectedEvent(event);

    window.history.replaceState(null, "", `/book?eventId=${event.id}`);
  };

  return (
    <>
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
            <input name="name" placeholder="Your Name" className="w-full border px-5 py-5 " />
            {state.errors?.name && <p>{state.errors.name}</p>}
          </div>

          <div>
            <input name="email" placeholder="Your Email" className="w-full border px-5 py-5 " />
            {state.errors?.email && <p>{state.errors.email}</p>}
          </div>

          <div>
            <input name="table" value={formData.table} readOnly placeholder="Table Number" className="w-full border px-5 py-5 " />
            {state.errors?.table && <p>{state.errors.table}</p>}
          </div>

          <div>
            <input name="guests" placeholder="Number of Guests" className="w-full border px-5 py-5 " />
            {state.errors?.guests && <p>{state.errors.guests}</p>}
          </div>

          <div>
            <select value={selectedEvent?.id || ""} onChange={handleEventChange} className="w-full border px-5 py-5 ">
              <option value="" disabled>
                Choose a night
              </option>

              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input name="phone" placeholder="Phone" className="w-full border px-5 py-5" />
            {state.errors?.phone && <p>{state.errors.phone}</p>}
          </div>

          <div className="md:col-span-2">
            <textarea name="comment" placeholder="Comment" className="w-full border px-5 py-5" />
          </div>

          {state.success && <p className="text-primary-500">{state.success}</p>}
          {state.submitError && <p className="text-primary-500">{state.submitError}</p>}

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={pending}>
              {pending ? "RESERVING..." : "RESERVE"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
