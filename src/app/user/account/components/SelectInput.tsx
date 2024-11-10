import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

interface SelectProps {
  selectType: string;
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const facultyOptions = [
  { label: "Engineering", value: "Engineering" },
  { label: "Art", value: "Art" },
  { label: "Science", value: "Science" },
];

const roleOptions = [
  { label: "Student", value: "Student" },
  { label: "Professor", value: "Professor" },
  { label: "Staff", value: "Staff" },
];

export default function SelectInput({
  selectType,
  id,
  label,
  placeholder,
  value,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: string) => {
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

  const options = selectType === "faculty" ? facultyOptions : roleOptions;

  return (
    <div className="gap-y-2">
      <label htmlFor={id} className="block font-medium text-[#111928]">
        {label}
      </label>
      <div className="relative w-full custom-select">
        <div
          className="flex flex-row bg-white border border-[#DFE4EA] rounded-md py-3 px-4 cursor-pointer gap-1"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div
            className={` grow ${
              options.find((option) => option.value === value)
                ? "text-[#637381]"
                : "text-[#9CA3AF]"
            }`}
          >
            {options.find((option) => option.value === value)?.label ||
              placeholder}
          </div>
          <Icon
            icon="quill:chevron-down"
            className="text-[#637381] size-4 my-auto"
          />
        </div>

        {isOpen && (
          <ul className="mt-2 absolute w-full border border-[#DFE4EA] bg-white rounded-md shadow-select z-10 py-2">
            {options.map((option) => (
              <li
                key={option.value}
                className="p-2 text-[#637381] hover:bg-blue-400 hover:text-white focus:bg-[#60A5FA] cursor-pointer"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
