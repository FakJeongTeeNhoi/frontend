import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { RoomDataType } from "../../page";

interface SelectProps {
  Rooms: RoomDataType[];
  value: RoomDataType | undefined;
  onChange: (value: RoomDataType) => void;
}

export default function SelectInput({ Rooms, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: RoomDataType) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".custom-select")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="gap-y-2 w-[250px] min-w-fit">
      <label htmlFor="room" className="block font-medium text-[#111928]">
        Room
      </label>
      <div className="relative w-full custom-select">
        <div
          className="flex flex-row bg-white border border-[#DFE4EA] rounded-md py-3 px-4 cursor-pointer gap-1"
          onClick={() => setIsOpen((prev) => !prev)}
          role="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          tabIndex={0}
        >
          <div
            className={`grow ${
              Rooms.find((option) => option.roomId === value?.roomId)
                ? "text-[#111928]"
                : "text-[#9CA3AF]"
            }`}
          >
            {Rooms.find((option) => option.roomId === value?.roomId)?.name ||
              "Room"}
          </div>
          <Icon
            icon="quill:chevron-down"
            className="text-[#637381] size-4 my-auto"
          />
        </div>

        {isOpen && (
          <ul className="mt-2 absolute w-full border border-[#DFE4EA] bg-white rounded-md shadow-select z-10 py-2">
            {Rooms.map((option) => (
              <li
                key={option.roomId}
                className="p-2 text-[#637381] hover:bg-blue-400 hover:text-white focus:bg-[#60A5FA] cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
