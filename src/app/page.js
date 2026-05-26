import { Suspense } from "react";
import Image from "next/image";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import FeaturedEvents from "@/components/FeaturedEvents/FeaturedEvents";
import WelcomeCard from "@/components/WelcomeCard";
import Testimonials from "@/components/Testimonials";
import VideoSection from "@/components/VideoSection";
import Gallery from "@/components/Gallery";
import Loader from "@/components/Loader";
import MusicSection from "@/components/MusicSection";
import Newsletter from "@/components/Newsletter";

import { BsForkKnife } from "react-icons/bs";
import { LiaCocktailSolid } from "react-icons/lia";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <Header />
      </Suspense>

      <Nav />

      <h2 className="pt-20 text-center text-[25px] uppercase">welcome in nightclub</h2>

      <Image className="mx-auto" src="/assets/bottom_line2.png" alt="bottom line" width={200} height={20} />

      <div className="flex flex-col md:flex-row justify-center gap-6 mt-10 items-center">
        <WelcomeCard image="/assets/content-img/thumb1.jpg" icon={<img src="/assets/icon/favicon.png" className="w-8 h-8" />} title="NIGHT CLUB" text="There are many variations of passages of Lorem Ipsum..." />

        <WelcomeCard image="/assets/content-img/reastaurant_1.jpg" icon={<BsForkKnife className="text-primary-500 text-3xl" />} title="RESTAURANT" text="It is a long established fact that a reader will be distracted..." />

        <WelcomeCard image="/assets/content-img/thumb2.jpg" icon={<LiaCocktailSolid className="text-primary-500 text-3xl" />} title="BAR" text="Contrary to popular belief, Lorem Ipsum is not simply random text..." />
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

      <Newsletter />
    </main>
  );
}
