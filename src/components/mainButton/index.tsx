import Image from "next/image";
import EnterIcon from "/public/icons/enter.svg";

const MainButton = () => {
  return (
    <button className="shadow-blue bg-lightBlue rounded-lg px-3 w-[110px] flex gap-2 h-[33px] justify-center items-center transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
      <p className="text-white font-medium text-sm tracking-2">Create</p>
      <div className="bg-darkWhite w-[17px] h-[33px]" />
      <Image src={EnterIcon} alt="enter" height={16} width={16} />
    </button>
  );
};

export default MainButton;
