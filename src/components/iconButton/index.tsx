import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Option {
  value: string;
  label: string;
}

interface IconButtonProps {
  iconSrc: string;
  text: string;
  options?: Option[];
  multiSelect?: boolean;
  borderType?: "dashed" | "solid";
}

const IconButton = ({
  iconSrc,
  text,
  options,
  multiSelect,
  borderType = "dashed",
}: IconButtonProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleOptionClick = (value: string) => {
    setSearchTerm("");

    if (multiSelect) {
      setSelectedOptions((prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((option) => option !== value)
          : [...prevSelected, value]
      );
    } else {
      setSelectedOptions([value]);
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

  return (
    <div className="relative" ref={containerRef}>
      <button
        className={`rounded-lg border-[#DFE1E4] border border-${borderType} h-[30px] px-3 flex gap-2 py-1.5 px-2 justify-center items-center font-medium tracking-2 text-commonGrey`}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <Image src={iconSrc} alt={text} height={16} width={16} />
        <p className="text-xs">{text}</p>
      </button>
      {isOpen && options && (
        <div className="absolute z-10 mt-2 bg-white border border-[#DFE1E4] rounded w-full">
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
                key={option.value}
                className={`font-medium tracking-2 text-darkCommonGrey text-xs px-2 py-1 cursor-pointer hover:bg-[#DFE1E4] ${
                  selectedOptions.includes(option.value)
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IconButton;
