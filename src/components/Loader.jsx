import Image from "next/image";

const Loader = ({ text }) => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 gap-4">
      <Image src="/assets/loader/madbars.gif" alt="loading" width={50} height={50} />
      {/* AI blev brugt til sparring om, hvordan teksten kun vises hvis text findes. */}
      {text && <p className="text-center text-sm">{text}</p>}
    </div>
  );
};

export default Loader;
