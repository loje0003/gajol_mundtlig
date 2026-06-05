import Image from "next/image";

function WelcomeCard({ image, icon, title, text }) {
  return (
    <div className="relative w-[75%] md:w-55 h-75 overflow-hidden group">
      <Image src={image} alt={title} width={200} height={300} className="object-cover w-full h-full transition duration-300 group-hover:scale-110" />

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white text-center p-4">
        <div className="mb-2">{icon}</div>

        <div className="translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-out">
          <h3 className="uppercase text-lg mb-2">{title}</h3>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
