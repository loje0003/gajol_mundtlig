"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  content: z.string().min(1, "Message is required"),
});

export async function contactAction(prevState, formData) {
  const values = {
    name: formData.get("name"),
    email: formData.get("email"),
    content: formData.get("content"),
  };

  // validation
  const result = contactSchema.safeParse(values);

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
    const response = await fetch("https://nightclub2026.onrender.com/contact_messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...result.data,
        date: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return {
        errors: {},
        success: "",
        submitError: `Something went wrong (${response.status})`,
      };
    }

    return {
      errors: {},
      success: "Message sent successfully!",
      submitError: "",
    };
  } catch (err) {
    return {
      errors: {},
      success: "",
      submitError: "Network error",
    };
  }
}
