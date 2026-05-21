"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { Suspense, useState } from "react";
import FeaturedEvents from "@/components/FeaturedEvents";
import { z } from "zod";
import { BsForkKnife } from "react-icons/bs";
import { LiaCocktailSolid } from "react-icons/lia";
import WelcomeCard from "@/components/WelcomeCard";
import Testimonials from "@/components/Testimonials";
import VideoSection from "@/components/VideoSection";
import Gallery from "@/components/Gallery";
import Loader from "@/components/Loader";
import MusicSection from "@/components/MusicSection";

const newsletterSchema = z.object({
  email: z.string().email("Please write a valid mail"),
});

export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      newsletterSchema.parse({ email });
      setError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.issues[0].message);
      }
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://nightclub2026.onrender.com/newsletters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!response.ok) {
        setError("Something went wrong, please try again");
        console.error("API error:", response.status);
        setLoading(false);
        return;
      }

      setError("");
      setSuccess("You are now subscribed");
      setEmail("");
      setLoading(false);

      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      console.error(error);
      setError("Something went wrong, please try again");
      setLoading(false);
    }
  };

  return (
    <main>
      <Suspense fallback={<Loader />}>
        <Header />
      </Suspense>
      <Nav />
      <h2 className="pt-20 text-center text-[25px] uppercase">welcome in nightclub</h2>
      <Image className="mx-auto" src="/assets/bottom_line2.png" alt="bottom line" width={200} height={20} />

      <div className="flex flex-col md:flex-row justify-center gap-6 mt-10 items-center">
        <WelcomeCard image="/assets/content-img/thumb1.jpg" icon={<img src="/assets/icon/favicon.png" className="w-8 h-8" />} title="NIGHT CLUB" text="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable." />

        <WelcomeCard image="/assets/content-img/reastaurant_1.jpg" icon={<BsForkKnife className="text-primary-500 text-3xl" />} title="RESTAURANT" text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution." />

        <WelcomeCard image="/assets/content-img/thumb2.jpg" icon={<LiaCocktailSolid className="text-primary-500 text-3xl" />} title="BAR" text="Contrary to popular belief, Lorem Ipsum is not simply random text. its has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin." />
      </div>

      <h2 className="pt-30 text-center text-[25px] uppercase">featured events</h2>
      <Image className="mx-auto" src="/assets/bottom_line2.png" alt="bottom line" width={200} height={20} />

      <Suspense fallback={<Loader text="Loading featured events..." />}>
        <FeaturedEvents />
      </Suspense>

      <Gallery />
      <MusicSection />

      <VideoSection />

      <Testimonials />

      <div className="my-30">
        <h2 className="text-center text-xl uppercase">Want the latest club news?</h2>
        <h3 className="text-center">
          Subscribe to our newsletter and never miss an <span className="text-primary-500">Event</span>
        </h3>
        <form onSubmit={handleSubscribe} className="text-center mt-10">
          <input className="border-b-1 pb-2 my-auto lg:mr-8 bg-black text-white placeholder-white outline-none focus:border-primary-500 transition" type="email" id="email" size="45" required placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button className="mt-4 lg:mt-0" type="submit" variant="primary" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </form>
      </div>
    </main>
  );
}
