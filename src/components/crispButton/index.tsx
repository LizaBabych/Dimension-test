import Image from "next/image";
import LightIcon from "/public/icons/lightning.svg";

const CrispButton = () => {
  return (
    <div className="rounded-md bg-lightGrey w-106 flex gap-2 py-1.5 px-2 justify-center items-center font-medium tracking-2 text-darkCommonGrey text-sm">
      <Image src={LightIcon} alt="light" height={16} width={16} />
      <p>Frontend</p>
    </div>
  );
};

export default CrispButton;
