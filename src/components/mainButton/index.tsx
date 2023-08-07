import Image from "next/image";
import EnterIcon from "/public/icons/enter.svg";

interface MainButtonProps {
  onClick: () => void;
}

const MainButton = ({ onClick }: MainButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="shadow-blue bg-lightBlue rounded-lg w-[110px] flex gap-2 h-[33px] justify-between px-3 items-center transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
    >
      <p className="text-white font-medium text-sm tracking-2">Create</p>
      <div className="bg-darkWhite w-[1px] h-[33px]" />
      <div>
        <Image src={EnterIcon} alt="enter" height={16} width={16} />
      </div>
    </button>
  );
};

export default MainButton;
