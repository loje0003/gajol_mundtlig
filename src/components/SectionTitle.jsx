import Image from "next/image";

const SectionTitle = ({ title }) => {
  return (
    <div className="text-center">
      <h2 className="pt-30 text-[25px] uppercase">{title}</h2>

      <Image className="mx-auto" src="/assets/bottom_line2.png" alt="bottom line" width={200} height={20} />
    </div>
  );
};

export default SectionTitle;
