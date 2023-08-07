import React, {
  useState,
  useRef,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import Image from "next/image";
import { Option } from "@/utils/interfaces";

interface IconButtonProps {
  iconSrc: string;
  text: string;
  options?: Option[];
  multiSelect?: boolean;
  setOptionValue?: Dispatch<SetStateAction<any>>;
  borderType?: "dashed" | "solid";
  onClick?: () => void;
  selected?: Array<number>;
  size?: number;
  fullWidth?: boolean;
  className?: string;
}

const IconButton = ({
  iconSrc,
  text,
  options,
  multiSelect,
  setOptionValue,
  borderType = "solid",
  selected,
  onClick,
  size = 16,
  fullWidth = false,
  className,
}: IconButtonProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    selected || []
  );

  useEffect(() => {
    setSelectedOptions(selected || []);
  }, [selected]);

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options
    ? options.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const handleOptionClick = (option: Option) => {
    setSearchTerm("");

    if (multiSelect) {
      const newOptionsValue = selectedOptions.includes(option.id)
        ? selectedOptions.filter(
            (selectedOption) => selectedOption !== option.id
          )
        : [...selectedOptions, option.id];
      const val =
        options && options.filter((item) => newOptionsValue.includes(item.id));
      setSelectedOptions(newOptionsValue);
      setOptionValue && val && setOptionValue(val);
    } else {
      setSelectedOptions([option.id]);
      setOptionValue && option && setOptionValue(option);
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getTitle = () => {
    if (options) {
      const res = options
        .filter((item) => selectedOptions.includes(item.id))
        .map(({ name }) => name);
      return res.length ? res.join(", ") : text;
    }
    return text;
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        style={{ borderStyle: borderType }}
        className={`${
          !fullWidth && "max-w-[110px]"
        } ${className} rounded-lg border-[#DFE1E4] border h-[30px] px-[11px] flex gap-2 py-1.5 justify-center items-center font-medium tracking-2 text-commonGrey`}
        onClick={() => {
          if (onClick) onClick();
          setIsOpen((prevState) => !prevState);
        }}
      >
        <Image src={iconSrc} alt={text} height={size} width={size} />
        <p className="text-xs w-100 word-wrap break-words whitespace-nowrap overflow-ellipsis overflow-hidden">
          {getTitle()}
        </p>
      </button>
      {isOpen && options && (
        <div className="absolute z-10 mt-2 bg-white border border-[#DFE1E4] rounded">
          <input
            type="text"
            className="w-full px-2 py-1 focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-48 overflow-y-auto list-none ml-0 pl-0">
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                className={`font-medium tracking-2 text-darkCommonGrey text-xs px-2 py-1 cursor-pointer hover:bg-[#DFE1E4] ${
                  selectedOptions.includes(option.id)
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IconButton;
