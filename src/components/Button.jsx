"use client";

import { motion } from "framer-motion";

const Button = ({ children, onClick, variant = "primary", className = "", type = "button" }) => {
  const base = "relative px-5 py-2 cursor-pointer uppercase overflow-hidden group";

  const variants = {
    primary: "relative px-5 py-2 cursor-pointer uppercase overflow-hidden group",
    secondary: "border border-primary-500 uppercase",

    tertiary: "relative text-white uppercase overflow-hidden",

    quaternary: "text-white bg-[oklch(0.6535_0.2419_9.27)] uppercase",
  };

  if (variant !== "primary" && variant !== "tertiary") {
    return (
      <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  }

  if (variant === "tertiary") {
    return (
      <motion.button type={type} onClick={onClick} className={`${base} ${variants.tertiary} ${className}`} initial="rest" whileHover="hover" animate="rest">
        <div className="absolute inset-0 bg-linear-to-r from-[oklch(0.6417_0.2372_5.45)] via-[oklch(0.5984_0.2295_348.95)] to-[oklch(0.5588_0.2348_329.1)]" />

        <motion.div
          className="absolute inset-0 bg-[oklch(0.5588_0.2348_329.1)]"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        />

        <span className="relative z-10 text-white">{children}</span>
      </motion.button>
    );
  }

  // AI blev brugt til sparring omkring hover-animationer med Framer Motion. Løsningen til de animerede border-linjer blev efterfølgende tilpasset projektets design
  return (
    <motion.button type={type} onClick={onClick} className={`${base} ${className}`} initial="rest" whileHover="hover" animate="rest">
      <span className="absolute top-0 left-0 w-full h-px bg-white" />
      <span className="absolute bottom-0 left-0 w-full h-px bg-white" />
      <motion.span
        className="absolute top-0 left-0 w-full h-px bg-primary-500"
        style={{ originX: 1 }}
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.35 }}
      />
      <motion.span
        className="absolute bottom-0 left-0 w-full h-px bg-primary-500"
        style={{ originX: 0 }}
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.35 }}
      />
      <motion.span
        className="relative z-10 text-white"
        variants={{
          rest: { color: "var(--color-white)" },
          hover: { color: "var(--color-primary-500)" },
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default Button;
