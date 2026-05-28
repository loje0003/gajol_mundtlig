"use server";

import { z } from "zod";

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

const reservationSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    table: z.string().min(1, "Choose a table"),
    guests: z.string().min(1, "Number of guests required"),
    phone: z.string().min(6, "Phone number required"),
    eventId: z.string().min(1, "Choose a night first"),
  })
  .superRefine((data, ctx) => {
    const tableNumber = Number(data.table);
    const guests = Number(data.guests);

    const max = tableCapacities[tableNumber];

    if (!max) {
      ctx.addIssue({
        path: ["table"],
        message: "Invalid table selected",
        code: "custom",
      });

      return;
    }

    if (guests > max) {
      ctx.addIssue({
        path: ["guests"],
        message: `Max ${max} guests allowed for this table`,
        code: "custom",
      });
    }
  });

export async function reservationAction(prevState, formData) {
  const values = {
    name: formData.get("name"),
    email: formData.get("email"),
    table: formData.get("table"),
    guests: formData.get("guests"),
    phone: formData.get("phone"),
    eventId: formData.get("eventId"),
    comment: formData.get("comment"),
  };

  const result = reservationSchema.safeParse(values);

  if (!result.success) {
    const errors = {};

    result.error.issues.forEach((err) => {
      errors[err.path[0]] = err.message;
    });

    return {
      errors,
      success: "",
      submitError: "",
    };
  }

  try {
    const response = await fetch("https://nightclub2026.onrender.com/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...result.data,
        date: new Date().toISOString(),
      }),
    });
    // AI assistance: forslag til håndtering af API status codes (409 + generic errors)
    if (response.status === 409) {
      return {
        errors: {},
        success: "",
        submitError: "This table is already reserved.",
      };
    }

    if (!response.ok) {
      return {
        errors: {},
        success: "",
        submitError: "Failed to send reservation.",
      };
    }

    return {
      errors: {},
      success: "Reservation successful!",
      submitError: "",
    };
  } catch {
    // AI har hjulpet med fallback til network error handling
    return {
      errors: {},
      success: "",
      submitError: "Network error",
    };
  }
}
