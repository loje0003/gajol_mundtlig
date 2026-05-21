import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

const CardEvent = ({ id, title, date, location, description, asset, index }) => {
  const imageSrc = asset?.startsWith("/") ? `https://nightclub2026.onrender.com${asset}` : asset;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(date).toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const isReversed = index % 2 === 1;

  return (
    <section
      className={`
        flex flex-col 
        md:flex-row md:items-stretch 
        ${isReversed ? "md:flex-row-reverse" : ""}
      `}
    >
      {/* IMAGE */}
      <div className="relative w-full h-75 md:w-1/2 md:h-auto">
        <Image src={imageSrc} alt={title || "event image"} fill className="object-cover" />
      </div>

      {/* CONTENT */}
      <div
        className={`
          flex w-full flex-col gap-4 p-8
          md:w-1/2 md:pt-10 
          ${isReversed ? "md:pl-40 md:pr-8" : "md:pr-40 md:pl-8"}
        `}
      >
        <h3 className="text-3xl uppercase leading-tight md:text-xl">{title}</h3>

        <div className="flex flex-wrap gap-2 text-sm md:text-base">
          <p className="text-primary-500">
            {formattedDate} · {formattedTime}
          </p>
          <span>|</span>
          <p className="uppercase">{location}</p>
        </div>

        <p className="text-base leading-relaxed text-gray-500">{description}</p>

        <div className="mt-4 mb-12 flex justify-center md:justify-end">
          <Link href={`/detailview/${id}`}>
            <Button variant="primary">READ MORE</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CardEvent;
