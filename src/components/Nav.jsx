"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const pathname = usePathname();

  const [hovered, setHovered] = useState(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const refs = useRef({});

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Book Table", href: "/book" },
    { name: "Contact Us", href: "/contact" },
  ];

  const activeItem = hovered || pathname;

  const setIndicator = (href) => {
    const el = refs.current[href];
    if (!el) return;

    setUnderline({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  };

  useEffect(() => {
    setIndicator(pathname);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-y border-primary-500 bg-black px-6 md:px-35 py-6">
      <div
        className="absolute top-0 left-0 w-10 h-10 bg-primary-500"
        // Vi fandt frem til clip-path gennem MDN, men AI blev brugt til at hjælpe med hvordan løsningen kunne implementeres i vores komponenter.

        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />

      <div
        className="absolute bottom-0 right-0 w-10 h-10 bg-primary-500"
        style={{
          clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
        }}
      />

      <div className="flex items-center justify-between">
        <div className="flex flex-col tracking-[0.13em]">
          <Link href="/" className="flex flex-col items-start">
            <h2 className="text-2xl font-bold text-white uppercase">
              Night<span className="text-primary-500">Club</span>
            </h2>

            <h3 className="text-[10px] tracking-[0.4em] text-white uppercase">Have a good time</h3>
          </Link>
        </div>

        <nav className="hidden md:block relative">
          <ul className="flex gap-8 uppercase font-medium relative">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li
                  key={item.name}
                  ref={(el) => (refs.current[item.href] = el)}
                  onMouseEnter={() => {
                    setHovered(item.href);
                    setIndicator(item.href);
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    setIndicator(pathname);
                  }}
                  className="relative"
                >
                  <Link href={item.href}>
                    <motion.div className="relative overflow-hidden h-6" initial={false} animate={pathname === item.href ? "active" : "rest"} whileHover="hover">
                      <motion.span
                        variants={{
                          rest: { y: 0 },
                          hover: { y: "-100%" },
                          active: { y: "-100%" },
                        }}
                        transition={{ duration: 0.35 }}
                        className="block text-white"
                      >
                        {item.name}
                      </motion.span>

                      <motion.span
                        variants={{
                          rest: { y: "100%" },
                          hover: { y: 0 },
                          active: { y: 0 },
                        }}
                        transition={{ duration: 0.35 }}
                        className="absolute left-0 top-0 block text-primary-500"
                      >
                        {item.name}
                      </motion.span>
                    </motion.div>
                  </Link>
                </li>
              );
            })}

            <motion.div
              className="absolute -bottom-3 h-2"
              animate={{
                x: underline.left,
                width: underline.width,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image src="/assets/bottom_line2.png" alt="underline" fill className="object-contain" />
            </motion.div>
          </ul>
        </nav>

        <button popoverTarget="mobile-menu" className="text-3xl text-white md:hidden">
          ☰
        </button>
      </div>

      <nav
        id="mobile-menu"
        popover="auto"
        className="
          fixed inset-0
          h-dvh w-dvw
          text-white
          m-0 p-0
        "
      >
        <div className="absolute top-6 right-6">
          <button popoverTarget="mobile-menu" popoverTargetAction="hide" className="text-4xl">
            ✕
          </button>
        </div>

        <ul className="flex h-full flex-col items-center justify-center gap-10 text-3xl uppercase">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/book">Book Table</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
