import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <Image src="/assets/loader/madbars.gif" alt="loading" width={50} height={50} />
    </div>
  );
};

export default Loader;
