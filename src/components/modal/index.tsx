import dynamic from "next/dynamic";
import Image from "next/image";
import CrispButton from "@/components/crispButton";
import Chevron from "/public/icons/chevron-right.svg";

const RemirrorEditor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const Modal = () => {
  return (
    <div className="w-718 min-h-[271px] h-full shadow-grey-shadow rounded-10 pt-4 mb-5 max-h-[600px]">
      <div className="flex gap-2 items-center px-4">
        <CrispButton />
        <Image src={Chevron} alt="chevron" height={20} width={20} />
        <div className="font-medium tracking-2 text-darkCommonGrey text-sm">
          New Task
        </div>
      </div>
      <div className="flex-1 justify-items-center pt-6">
        <input
          type="text"
          placeholder="Task title"
          className="outline-0 ml-6"
        />
        <RemirrorEditor />
      </div>
    </div>
  );
};

export default Modal;
