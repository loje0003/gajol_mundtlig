"use client";

import { useState } from "react";
import { z } from "zod";
import Button from "@/components/Button";

// AI blev brugt til støtte til opsætning af zod

const newsletterSchema = z.object({
  email: z.string().email("Please write a valid mail"),
});

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      newsletterSchema.parse({ email });
      setError("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      }
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://nightclub2026.onrender.com/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.status === 409) {
        setError("This email is already subscribed");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError("Something went wrong, please try again");
        setLoading(false);
        return;
      }

      setSuccess("You are now subscribed");
      setEmail("");
      setError("");
      setLoading(false);

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError("Something went wrong, please try again");
      setLoading(false);
    }
  };

  return (
    <div className="my-30">
      <h2 className="text-center text-xl uppercase">Want the latest club news?</h2>

      <h3 className="text-center">
        Subscribe to our newsletter and never miss an <span className="text-primary-500">Event</span>
      </h3>

      <form onSubmit={handleSubscribe} className="text-center mt-10">
        <input className="border-b-1 pb-2 my-auto lg:mr-8  placeholder-white outline-none focus:border-primary-500 transition" type="email" size="45" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-red-500  mt-2">{success}</p>}
      </form>
    </div>
  );
}
